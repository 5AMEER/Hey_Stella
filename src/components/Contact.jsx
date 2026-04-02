import { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const nextErrors = {}
    const name = data.name.trim()
    const email = data.email.trim()
    const subject = data.subject.trim()
    const message = data.message.trim()

    if (!name) {
      nextErrors.name = 'Please enter your name.'
    } else if (name.length < 2) {
      nextErrors.name = 'Name should be at least 2 characters.'
    } else if (name.length > 60) {
      nextErrors.name = 'Name should be 60 characters or fewer.'
    }

    if (!email) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (subject.length > 120) {
      nextErrors.subject = 'Subject should be 120 characters or fewer.'
    }

    if (!message) {
      nextErrors.message = 'Please enter your message.'
    } else if (message.length < 10) {
      nextErrors.message = 'Message should be at least 10 characters.'
    } else if (message.length > 2000) {
      nextErrors.message = 'Message should be 2000 characters or fewer.'
    }

    return nextErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const to = 'whosameerarora@gmail.com'
      const subject = formData.subject.trim() || `New message from ${formData.name.trim() || 'portfolio visitor'}`

      const bodyLines = [
        formData.message.trim(),
        '',
        '—',
        `From: ${formData.name.trim()}`,
        `Email: ${formData.email.trim()}`,
      ]

      const body = bodyLines.join('\n')
      const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      window.location.assign(mailtoLink)
    } catch (error) {
      alert('Could not open your email app right now. Please try again or email me directly at whosameerarora@gmail.com.')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">04.</span>
          Get In Touch
        </h2>
        <div className="contact-content">
          <div className="contact-info">
            <p className="contact-description">
              Got questions, compliments, or just want to share a great AI joke? Reach out! I promise, 
              I don't byte...much.
            </p>
            <div className="contact-social">
              <a href="https://github.com/5AMEER" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/sameerar01" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com/whosameerarora" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="mailto:whosameerarora@gmail.com" aria-label="Email">
                <FaEnvelope />
                <span>Email</span>
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name ? <p className="form-error">{errors.name}</p> : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email ? <p className="form-error">{errors.email}</p> : null}
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Let\'s talk about..."
                className={errors.subject ? 'input-error' : ''}
              />
              {errors.subject ? <p className="form-error">{errors.subject}</p> : null}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className={errors.message ? 'input-error' : ''}
              ></textarea>
              {errors.message ? <p className="form-error">{errors.message}</p> : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>Designed & Built with ❤️</p>
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </section>
  )
}

export default Contact

