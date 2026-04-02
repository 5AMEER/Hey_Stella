import { useEffect, useState, useRef, useCallback } from 'react'
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

const TRAIL_SYMBOLS = ['✶', '✺', '✦', '✳', '✱', '⊗', '×', '○', '◇', '◆', '✧', '✴'];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const heroRef = useRef(null);
  const trailLayerRef = useRef(null);
  const trailLastTsRef = useRef(0);

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

  const spawnTrailSymbol = useCallback((clientX, clientY) => {
    const heroEl = heroRef.current;
    const layer = trailLayerRef.current;
    if (!heroEl || !layer) return;

    const rect = heroEl.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    const now = performance.now();
    if (now - trailLastTsRef.current < 15) return;
    trailLastTsRef.current = now;

    const symbol = document.createElement('span');
    symbol.className = 'pc-trail-symbol';
    symbol.textContent = TRAIL_SYMBOLS[Math.floor(Math.random() * TRAIL_SYMBOLS.length)] ?? '*';

    const size = (10 + Math.random() * 14) * 2.5;
    const life = 900 + Math.random() * 900;
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 60;

    symbol.style.left = `${x}px`;
    symbol.style.top = `${y}px`;
    symbol.style.fontSize = `${size}px`;
    symbol.style.setProperty('--dx', `${offsetX}px`);
    symbol.style.setProperty('--dy', `${offsetY}px`);
    symbol.style.setProperty('--life', `${life}ms`);

    layer.appendChild(symbol);

    const maxChildren = 210;
    while (layer.childElementCount > maxChildren) {
      layer.removeChild(layer.firstChild);
    }

    window.setTimeout(() => {
      symbol.remove();
    }, life + 200);
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      spawnTrailSymbol(event.clientX, event.clientY);
    },
    [spawnTrailSymbol]
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero"
      onPointerMove={handlePointerMove}
    >
      <div ref={trailLayerRef} className="hero-trail-layer" />
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