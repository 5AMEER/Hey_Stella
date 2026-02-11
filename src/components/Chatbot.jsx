import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])

  const predefinedQuestions = [
    "What technologies do you work with?",
    "Tell me about your experience",
    "What projects have you worked on?",
    "How can I contact you?",
    "What's your background?",
    "Do you do freelance work?"
  ]

  const responses = {
    "What technologies do you work with?": "I work with a variety of technologies including JavaScript (ES6+), React, Node.js, TypeScript, Python, and MongoDB. I'm always learning and exploring new tools to build better solutions.",
    "Tell me about your experience": "I'm a passionate developer who loves building digital solutions that make a difference. My journey in software development started with curiosity and has evolved into a career focused on creating exceptional user experiences.",
    "What projects have you worked on?": "I've worked on various projects including e-commerce platforms, task management apps, weather dashboards, and portfolio websites. Each project has been a learning experience that helped me grow as a developer.",
    "How can I contact you?": "You can reach me through the contact form on this page, or connect with me on GitHub, LinkedIn, or via email at whosameerarora@gmail.com. I'd love to hear from you!",
    "What's your background?": "I'm a nerd.",
    "Do you do freelance work?": "Yes, I'm open to freelance opportunities! Whether it's building web applications, designing user interfaces, or solving complex problems, I bring enthusiasm and attention to detail to every project."
  }

  const handleQuestionClick = (question) => {
    const userMessage = { type: 'user', text: question }
    const botMessage = { type: 'bot', text: responses[question] || "I'm sorry, I don't have an answer for that question yet." }
    
    setMessages(prev => [...prev, userMessage, botMessage])
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      setMessages([{
        type: 'bot',
        text: "Hi! I'm here to help. Select a question below to get started, or feel free to ask me anything!"
      }])
    }
  }

  return (
    <>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={handleOpen} aria-label="Open chatbot">
          <img src="/images/image.png" alt="Chatbot Icon" className="chatbot-icon" />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Chat with me</h3>
            <button className="chatbot-close" onClick={handleClose} aria-label="Close chatbot">
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="chatbot-questions">
            <p className="questions-label">Quick questions:</p>
            <div className="questions-list">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="question-btn"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot

