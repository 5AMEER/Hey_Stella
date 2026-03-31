import { useState, useRef, useEffect } from 'react'
import './AIChat.css'

const STATIC_RESPONSES = [
  'I am in fallback mode right now and could not fetch a response this time. Please try again in a moment.',
  'I am using local profile context only. I could not process that request just now—please retry.',
  'Something interrupted my local response flow. Please ask again, and I will try immediately.'
]

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
      const aiResponse = data?.response || 'I could not generate a response right now.'

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat Error:', error)
      const randomResponse = STATIC_RESPONSES[Math.floor(Math.random() * STATIC_RESPONSES.length)]
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'assistant',
        content: randomResponse
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
