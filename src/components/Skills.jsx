import {
  FaReact, FaPython, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaBrain, FaDatabase, FaMusic
} from 'react-icons/fa';
import { 
  SiTensorflow, SiKubernetes, SiGooglecloud, SiOpencv, SiGnubash
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const skills = [
    { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { name: 'Machine Learning', icon: <FaBrain />, color: '#FFD700' },
    { name: 'Deep Learning (CNN, RNN)', icon: <SiTensorflow />, color: '#FF6F00' },
    { name: 'Computer Vision', icon: <SiOpencv />, color: '#5C3EE8' },
    { name: 'GenAI (LLMs, RAG)', icon: <FaBrain />, color: '#8A2BE2' },
    { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
    { name: 'VertexAI', icon: <SiGooglecloud />, color: '#4285F4' },
    { name: 'LangChain/LangGraph', icon: <FaBrain />, color: '#8A2BE2' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB' },
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'SQL', icon: <FaDatabase />, color: '#4479A1' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326CE5' },
    { name: 'Model Context Protocol (MPC)', icon: <SiGnubash />, color: '#4EAA25' },
    { name: 'Vibe Coding', icon: <FaMusic />, color: '#C678DD' },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">02.</span>
          Skills & Technologies
        </h2>
        <div className="ticker">
          <div className="ticker-row ticker-row-left">
            {[...skills, ...skills].map((skill, index) => (
              <div key={index} className="ticker-item">
                <div className="ticker-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="ticker-name">{skill.name}</span>
              </div>
            ))}
          </div>
          <div className="ticker-row ticker-row-right">
            {[...skills, ...skills].map((skill, index) => (
              <div key={index} className="ticker-item">
                <div className="ticker-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="ticker-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

