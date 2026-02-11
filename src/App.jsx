import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import AIChat from './components/AIChat'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <AIChat />
      <Skills />
      <Projects />
      <Contact />
      <Chatbot />
    </div>
  )
}

export default App

