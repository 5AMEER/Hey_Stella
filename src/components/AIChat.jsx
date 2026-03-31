import { useState, useRef, useEffect } from 'react'
import './AIChat.css'
import stellaKnowledge from '../data/stellaKnowledge.json'

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'i',
  'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'to', 'was', 'what',
  'when', 'where', 'who', 'why', 'with', 'you', 'your'
])

const CONTACT_KEYWORDS = ['contact', 'email', 'phone', 'linkedin', 'github']

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

function getTopContext(query, limit = 4) {
  const queryTokens = tokenize(query)
  const isContactIntent = hasAnyKeyword(query, CONTACT_KEYWORDS)

  if (!queryTokens.length) {
    return []
  }

  return stellaKnowledge
    .map((chunk) => {
      const chunkTokens = new Set(tokenize(getSearchableText(chunk)))
      let score = 0

      for (const token of queryTokens) {
        if (chunkTokens.has(token)) {
          score += 1
        }
      }

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

function buildClientFallbackResponse(question) {
  const contextChunks = getTopContext(question)
  const isContactIntent = hasAnyKeyword(question, CONTACT_KEYWORDS)

  if (isContactIntent) {
    const combined = contextChunks.map((chunk) => getSearchableText(chunk)).join(' ')
    const email = combined.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]
    const rawPhone = combined.match(/\+?\d[\d\s()-]{8,}\d/)?.[0]
    const phone = rawPhone
      ? rawPhone.replace(/[^\d+\s-]/g, '').replace(/\s+/g, ' ').trim()
      : null
    const linkedin = combined.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s]+/i)?.[0]
    const github = combined.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s]+/i)?.[0]

    const lines = []
    if (email) lines.push(`- Email: ${email}`)
    if (phone) lines.push(`- Phone: ${phone}`)
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

  const top = contextChunks[0]
  return [
    'I’m in fallback mode and answering from local profile data.',
    '',
    `${top.title}: ${String(top.content || '').replace(/\s+/g, ' ').trim()}`
  ].join('\n')
}

export default function AIChat() {
  const apiBase = import.meta.env.VITE_API_URL || '/api'
  const fallbackModeActive = true
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Heyy! I\'m Stella, Sameer\'s personal AI assistant here to answer your questions. Ask me anything!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatMessagesRef = useRef(null)

  const scrollToBottom = () => {
    const chatContainer = chatMessagesRef.current
    if (!chatContainer) return
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(`${apiBase}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}))
        throw new Error(errorPayload.error || 'Failed to get response from Stella')
      }

      const data = await response.json()
      const aiResponse = data?.response || buildClientFallbackResponse(input)

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat Error:', error)
      const localResponse = buildClientFallbackResponse(input)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'assistant',
        content: localResponse
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="aichat" className="aichat-section">
      <div className="aichat-container">
        <div className="aichat-heading-row">
          <h2>Say Hi to Stella!👋</h2>
          {fallbackModeActive && (
            <span className="aichat-status-badge">Fallback mode active</span>
          )}
        </div>
        <p className="aichat-status-text">
          Fallback mode is active. This may happen due to API quota/rate limits.
        </p>
        <div className="chat-interface">
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((message) => (
              <div key={message.id} className={`message message-${message.type}`}>
                <div className="message-bubble">
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message message-assistant">
                <div className="message-bubble">
                  <span className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Sameer..."
              className="chat-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={loading || !input.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="currentColor"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
