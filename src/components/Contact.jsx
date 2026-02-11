import { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
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
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaTwitter />
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
              />
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
              />
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
              ></textarea>
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

