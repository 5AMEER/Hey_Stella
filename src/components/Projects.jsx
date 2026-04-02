import { useState, useCallback, useMemo } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const projectsData = [
    {
      title: 'AI Team Manager using MCP/Claude',
      description: 'Built an MCP (Model Context Protocol) server enabling AI models to manage employee leave systems - handling requests, approvals, balance checks, task assignment, and progress tracking via natural language, Fully agentic - AI interacts directly with an employee database without human-in-the-loop for routine operations.',
      tech: ['Python', 'MCP', 'Claude', 'SQLite'],
      github: 'https://github.com/5AMEER',
      demo: 'https://www.linkedin.com/posts/sameerar01_genai-claudeai-mcp-ugcPost-7425577521347301376-T4eL?utm_source=share&utm_medium=member_desktop&rcm=ACoAADxgOg0BiKNcam2yC3wMabfzcoXVNTRVa0I',
      featured: true,
    },
    {
      title: 'Interpretable features of YOLO v8 for Weapon Detection - Performance driven approach',
      description: 'IEEE International Conference on Emerging Innovations and Advanced Computing (INNOCOMP), September 2024  | \nLed end-to-end model design, training, evaluation, and visualisation of a custom YOLOv8 model across multiple optimizers; accepted and presented at an IEEE-affiliated conference under mentorship of two Ph.D. professors.\nEvaluated models using precision-recall, F1-score, and confidence curves; identified the optimal optimizer configuration for real-world weapon detection deployments.',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'Transfer Learning'],
      github: 'https://github.com/5AMEER/MultiClass_Object_Detection',
      demo: 'https://ieeexplore.ieee.org/document/10664093',
      featured: true,
    },
    {
      title: 'AI-powered Full-stack ERP system',
      description: 'One of my Freelance projects, Built an enterprise-level ERP system featuring advanced billing, inventory management, financial reporting, and automated WhatsApp marketing.Integrated a RAG pipeline using LangChain for conversational business intelligence and automated audit trails. ',
      tech: ['StreamLit', 'Python', 'SQLite', 'Whatsapp API'],
      github: 'https://github.com/5AMEER',
      // demo: 'https://example.com',
      featured: true,
    },
    {
      title: 'Spotify Playlist Generator',
      description: 'Developed a web scraping tool to compile a list of songs and used the Spotify API to generate playlists. Implemented exception handling to manage songs temporarily unavailable on Spotify, ensuring seamless playlist creation.',
      tech: ['Python', 'Selenium', 'Spotify API'],
      github: 'https://github.com/5AMEER',
      demo: 'https://github.com/5AMEER',
      featured: false,
    },
    {
      title: 'Portfolio Website',
      description: "You're Looking at it rn, What do you think about it? 😉.",
      tech: ['React', 'Vite', 'CSS3', 'Framer Motion', 'React Icons', 'Constant Brainstorming🧠', 'GitHub Pages', 'Python'],
      github: 'https://github.com/5AMEER/Hey_Stella',
      demo: 'https://5ameer.github.io/Hey_Stella/',
      featured: false,
    },
  ]

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isCycling, setIsCycling] = useState(false)
  const [direction, setDirection] = useState('next')

  const projects = useMemo(() => projectsData, [])

  const cycle = useCallback(
    (dir = 'next') => {
      if (isCycling || projects.length <= 1) return
      setIsCycling(true)
      setDirection(dir)

      const offset = dir === 'prev' ? -1 : 1
      const nextIndex = (activeIndex + offset + projects.length) % projects.length

      window.setTimeout(() => {
        setActiveIndex(nextIndex)
        setIsCycling(false)
      }, 260)
    },
    [activeIndex, isCycling, projects.length]
  )

  const handleExpand = index => {
    setExpandedIndex(index)
  }

  const handleCloseExpand = () => {
    setExpandedIndex(null)
  }

  const activeProject = projects[activeIndex]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span>
          Featured Researches & Projects
        </h2>
        <div className="projects-deck-wrapper">
          <div className="projects-deck">
            {projects.map((project, index) => {
              const isActive = index === activeIndex
              const isBehind = index !== activeIndex

              const position = (index - activeIndex + projects.length) % projects.length

              const layerClass = isActive
                ? 'deck-card deck-card--active'
                : position === 1
                  ? 'deck-card deck-card--second'
                  : position === 2
                    ? 'deck-card deck-card--third'
                    : 'deck-card deck-card--hidden'

              return (
                <button
                  key={project.title}
                  type="button"
                  className={`${layerClass} ${direction === 'prev' ? 'deck-card--reverse' : ''}`}
                  onClick={() => (isActive ? handleExpand(index) : setActiveIndex(index))}
                  disabled={isBehind && isCycling}
                >
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                          <FaGithub />
                        </a>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Demo">
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <ul className="project-tech">
                      {project.tech.map(tech => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </button>
              )
            })}
          </div>
          <div className="projects-deck-controls">
            <button
              type="button"
              className="deck-nav deck-nav--prev"
              onClick={() => cycle('prev')}
              aria-label="Previous project"
            >
              ◀
            </button>
            <span className="deck-indicator">
              {activeIndex + 1} / {projects.length}
            </span>
            <button
              type="button"
              className="deck-nav deck-nav--next"
              onClick={() => cycle('next')}
              aria-label="Next project"
            >
              ▶
            </button>
          </div>
        </div>

        {expandedIndex != null && activeProject && (
          <div className="project-modal" role="dialog" aria-modal="true">
            <div className="project-modal-backdrop" onClick={handleCloseExpand} />
            <div className="project-modal-content">
              <button
                type="button"
                className="project-modal-close"
                onClick={handleCloseExpand}
                aria-label="Close project details"
              >
                ✕
              </button>
              <h3 className="project-modal-title">{activeProject.title}</h3>
              <p className="project-modal-description">{activeProject.description}</p>
              <ul className="project-modal-tech">
                {activeProject.tech.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="project-modal-links">
                <a href={activeProject.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Code
                </a>
                <a href={activeProject.demo} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

