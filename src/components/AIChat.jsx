import { useState, useRef, useEffect } from 'react'
import './AIChat.css'

const STATIC_RESPONSES = [
  "I'm currently undergoing a bit of a brain transplant! My RAG pipeline is still in the shop, so I don't have access to my full memory bank just yet. Check back soon!",
  "I'd love to help with that, but my internal library is currently being reorganized. Once the integration is complete, I'll be much more talkative.",
  "System Note: Stella’s knowledge retrieval system is currently offline. I'm here, but I’m working with a very limited 'short-term' memory right now.",
  "Patience is a virtue, right? I’m in the middle of a massive upgrade. Think of this as my 'quiet phase' before I become the smartest person in the room.",
  "I see you! Unfortunately, my data-hungry RAG pipeline hasn't been fed yet. I'm basically a genius on a very strict information diet at the moment.",
  "I’m currently ‘unplugged’ from my main database. It’s very peaceful, actually—but not very helpful for you. We’ll be fully synced up shortly!",
  "Error 404: Context Not Found. My RAG integration is pending, meaning I can’t access specific documents or data yet. Stay tuned!",
  "Integration in progress. I am currently operating in static mode and cannot retrieve external information until my pipeline is finalized.",
  "I’m standing by! However, my ability to process and retrieve specific data is limited until the RAG setup is complete.",
  "Loading... Loading... (The RAG pipeline is the missing piece of the puzzle. We’re working on it!)"
]

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Heyy! I\'m Stella, Sameer\'s personal AI assistant here to answer your questions. Ask me anything!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      // Use environment variable for API URL, fallback to localhost for dev
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      if (!response.ok) throw new Error('Failed to get response from Stella')

      const data = await response.json()
      const aiResponse = data.response

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
        <h2>Say Hi to Stella!👋</h2>
        <div className="chat-interface">
          <div className="chat-messages">
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
            <div ref={messagesEndRef} />
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
