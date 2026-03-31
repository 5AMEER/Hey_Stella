import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'

const PORT = Number(process.env.API_PORT || 8787)
const KNOWLEDGE_FILE = path.join(process.cwd(), 'src', 'data', 'stellaKnowledge.json')
const RATE_WINDOW_MS = 60 * 1000
const MAX_REQUESTS_PER_WINDOW = Number(process.env.MAX_REQUESTS_PER_WINDOW || 20)
const CACHE_TTL_MS = 5 * 60 * 1000

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'i',
  'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'to', 'was', 'what',
  'when', 'where', 'who', 'why', 'with', 'you', 'your'
])

const requestBuckets = new Map()
const responseCache = new Map()

function nowMs() {
  return Date.now()
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const current = nowMs()
  const bucket = requestBuckets.get(ip)

  if (!bucket || current - bucket.windowStart > RATE_WINDOW_MS) {
    requestBuckets.set(ip, { windowStart: current, count: 1 })
    return false
  }

  bucket.count += 1
  requestBuckets.set(ip, bucket)
  return bucket.count > MAX_REQUESTS_PER_WINDOW
}

function cleanupState() {
  const current = nowMs()

  for (const [ip, bucket] of requestBuckets.entries()) {
    if (current - bucket.windowStart > RATE_WINDOW_MS) {
      requestBuckets.delete(ip)
    }
  }

  for (const [key, cached] of responseCache.entries()) {
    if (current > cached.expiresAt) {
      responseCache.delete(key)
    }
  }
}

function getCachedResponse(cacheKey) {
  const cached = responseCache.get(cacheKey)
  if (!cached) {
    return null
  }

  if (nowMs() > cached.expiresAt) {
    responseCache.delete(cacheKey)
    return null
  }

  return cached
}

function setCachedResponse(cacheKey, payload) {
  responseCache.set(cacheKey, {
    ...payload,
    expiresAt: nowMs() + CACHE_TTL_MS
  })
}

function normalizeText(text = '') {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
}

function tokenize(text = '') {
  return normalizeText(text)
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
}

function hasAnyKeyword(text, keywords) {
  const normalized = normalizeText(text)
  return keywords.some((keyword) => normalized.includes(keyword))
}

function getSearchableText(chunk) {
  const tagsText = Array.isArray(chunk?.tags) ? chunk.tags.join(' ') : ''
  const metadataText = chunk?.metadata && typeof chunk.metadata === 'object'
    ? Object.values(chunk.metadata).join(' ')
    : ''

  return `${chunk?.title || ''} ${chunk?.content || ''} ${tagsText} ${metadataText}`
}

function extractContactDetails(contextChunks) {
  const combined = contextChunks.map((chunk) => getSearchableText(chunk)).join(' ')
  const email = combined.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]
  const rawPhone = combined.match(/\+?\d[\d\s()-]{8,}\d/)?.[0]
  const phone = rawPhone
    ? rawPhone.replace(/[^\d+\s-]/g, '').replace(/\s+/g, ' ').trim()
    : null
  const linkedin = combined.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s]+/i)?.[0]
  const github = combined.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s]+/i)?.[0]

  return { email, phone, linkedin, github }
}

function scoreChunk(queryTokens, chunkText) {
  const chunkTokens = new Set(tokenize(chunkText))
  let score = 0

  for (const token of queryTokens) {
    if (chunkTokens.has(token)) {
      score += 1
    }
  }

  return score
}

async function getTopContext(query, limit = 4) {
  const raw = await fs.readFile(KNOWLEDGE_FILE, 'utf-8')
  const chunks = JSON.parse(raw)
  const queryTokens = tokenize(query)
  const isContactIntent = hasAnyKeyword(query, ['contact', 'email', 'phone', 'linkedin', 'github'])

  if (!Array.isArray(chunks) || queryTokens.length === 0) {
    return []
  }

  return chunks
    .map((chunk) => {
      const searchable = getSearchableText(chunk)
      let score = scoreChunk(queryTokens, searchable)

      if (isContactIntent && Array.isArray(chunk?.tags) && chunk.tags.includes('contact')) {
        score += 3
      }

      return {
        ...chunk,
        score
      }
    })
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

function buildFallbackResponse(question, contextChunks) {
  const isContactIntent = hasAnyKeyword(question, ['contact', 'email', 'phone', 'linkedin', 'github'])

  if (isContactIntent) {
    const { email, phone, linkedin, github } = extractContactDetails(contextChunks)

    const lines = []
    if (email) lines.push(`- Email: ${email}`)
    if (phone) lines.push(`- Phone: ${phone.trim()}`)
    if (linkedin) lines.push(`- LinkedIn: ${linkedin}`)
    if (github) lines.push(`- GitHub: ${github}`)

    if (lines.length) {
      return [
        'I’m in fallback mode and answering from local profile data.',
        '',
        'Here are Sameer\'s contact details:',
        ...lines
      ].join('\n')
    }
  }

  if (!contextChunks.length) {
    return [
      'I’m in fallback mode and answering from local profile data.',
      '',
      'I couldn\'t find a strong match for that question.',
      'Try asking about contact, skills, experience, projects, or publications.'
    ].join('\n')
  }

  const summary = contextChunks.slice(0, 3).map((chunk, index) => {
    const cleanContent = String(chunk.content || '').replace(/\s+/g, ' ').trim()
    return `${index + 1}. ${chunk.title} — ${cleanContent}`
  })

  return [
    'I’m in fallback mode and answering from local profile data.',
    '',
    `Here’s a quick answer for: "${question}"`,
    ...summary
  ].join('\n')
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  res.end(JSON.stringify(payload))
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true })
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      message: 'Local API running in always-on fallback mode',
      fallbackAlwaysOn: true,
      cacheEntries: responseCache.size
    })
  }

  if (req.method !== 'POST' || req.url !== '/api/chat') {
    return sendJson(res, 404, { error: 'Not found' })
  }

  try {
    cleanupState()

    const clientIp = getClientIp(req)
    if (isRateLimited(clientIp)) {
      return sendJson(res, 200, {
        response: 'Too many local requests right now. Please wait a few seconds and try again.',
        sources: [],
        fallbackActive: true
      })
    }

    let rawBody = ''
    for await (const chunk of req) {
      rawBody += chunk
    }

    const parsed = rawBody ? JSON.parse(rawBody) : {}
    const message = parsed?.message?.trim()

    if (!message) {
      return sendJson(res, 400, { error: 'Message is required' })
    }

    const cacheKey = normalizeText(message)
    const cached = getCachedResponse(cacheKey)
    if (cached) {
      return sendJson(res, 200, {
        response: cached.response,
        sources: cached.sources,
        cached: true,
        fallbackActive: true
      })
    }

    const topContext = await getTopContext(message)
    const response = buildFallbackResponse(message, topContext)

    const sources = topContext.map((chunk) => chunk.title)
    setCachedResponse(cacheKey, {
      response,
      sources
    })

    return sendJson(res, 200, {
      response,
      sources,
      fallbackActive: true
    })
  } catch (error) {
    return sendJson(res, 500, {
      error: 'Failed to generate response',
      details: error.message
    })
  }
})

server.listen(PORT, () => {
  console.log(`Local Stella API running on http://localhost:${PORT}`)
})
