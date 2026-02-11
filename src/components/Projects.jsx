import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'YOLOv8 for Weapon Detection',
      description: 'Published in IEEE, 2024. Comparative performance analysis of YOLOv8 model across multiple optimizers for real-time weapon detection in surveillance footage.',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'Transfer Learning'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      tech: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true,
    },
    {
      title: 'Spotify Playlist Generator',
      description: 'Using Spotify API to create personalized playlists based on user preferences. Used web-scraping to gather additional data on song popularity and trends.',
      tech: ['Python', 'Selenium', 'Spotify API'],
      github: 'https://github.com/5AMEER',
      demo: 'https://github.com/5AMEER',
      featured: false,
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations.',
      tech: ['React', 'Vite', 'CSS3'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: false,
    },
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span>
          Featured Researches & Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
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
                  {project.tech.map((tech, techIndex) => (
                    <li key={techIndex}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

