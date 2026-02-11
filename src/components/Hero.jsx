import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaInstagram } from 'react-icons/fa'
import ProfileCard from './ProfileCard';
import './ProfileCard.css';
import './Hero.css'

const roles = [
  "An AI Enthusiast",
  "Athelete",
  "Photographer",
  "GenAI Developer",
  "Music Adorer",
  "Just A Chill Guy"
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleTyping = () => {
      const fullRole = roles[roleIndex];
      if (isDeleting) {
        // Deleting
        if (charIndex > 0) {
          setCurrentRole(fullRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      } else {
        // Typing
        if (charIndex < fullRole.length) {
          setCurrentRole(fullRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <h1 className="hero-title">
            <span className="greeting">Hi, I'm</span>
            <span className="name">Sameer</span>
            <span className="role">
              {currentRole}
              <span className="typing-cursor">|</span>
            </span>
          </h1>
          <p className="hero-description">
            I Code.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
              View My Work
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </button>
          </div>
          <div className="hero-social">
            <a href="https://github.com/5AMEER" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/sameerar01/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/whosameerarora/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="mailto:whosameerarora@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className={`hero-image ${isVisible ? 'visible' : ''}`}>
          <ProfileCard
            avatarUrl="/Hey_Stella/images/profile.jpg"
            name="Sameer Arora"
            title="Software Engineer"
            handle="5AMEER"
            status="Ready to connect"
            contactText="Contact Me"
            onContactClick={() => scrollToSection('contact')}
          />
        </div>
      </div>
      <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
        <FaArrowDown />
      </div>
    </section>
  )
}

export default Hero