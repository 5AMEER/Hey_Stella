import { useRef, useCallback } from 'react'
import { FaHome, FaUser, FaCode, FaFolderOpen, FaEnvelope, FaStar } from 'react-icons/fa'
import { RiVoiceAiFill } from "react-icons/ri";
import './Navbar.css'

const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome /> },
  { id: 'about', label: 'About', icon: <FaUser /> },
  { id: 'stella', label: 'Stella', icon: <RiVoiceAiFill /> },
  { id: 'skills', label: 'Skills', icon: <FaCode /> },
  { id: 'projects', label: 'Projects', icon: <FaFolderOpen /> },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
]

const Navbar = ({ activeSection }) => {
  const dockRef = useRef(null)

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleMouseMove = useCallback((event) => {
    const dock = dockRef.current
    if (!dock) return

    const mouseY = event.clientY
    const maxDistance = 140
    const items = dock.querySelectorAll('.dock-item')

    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const itemCenterY = rect.top + rect.height / 2
      const distance = Math.abs(mouseY - itemCenterY)
      const ratio = Math.max(0, 1 - distance / maxDistance)
      const scale = 1 + ratio * 1.6
      item.style.setProperty('--scale', scale.toFixed(2))
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const dock = dockRef.current
    if (!dock) return

    const items = dock.querySelectorAll('.dock-item')
    items.forEach((item) => {
      item.style.setProperty('--scale', '1')
    })
  }, [])

  return (
    <nav className="navbar-dock">
      <div
        ref={dockRef}
        className="dock"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`dock-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(item.id)
            }}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar

