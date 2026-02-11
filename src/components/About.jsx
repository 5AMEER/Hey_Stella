import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">01.</span>
          About Me
        </h2>
        <div className="about-content">
          <div className="about-text">
            <div className="about-image">
              <div className="image-wrapper">
                <img 
                  src="/images/profile2.png" 
                  alt="Sameer" 
                  className="profile-image"
                />
              </div>
            </div>
            <p>
              Hey there! I’m a developer and ML engineer who loves building cool stuff that actually makes life easier, or at least more interesting.
              I started coding out of curiosity (and maybe to impress a few friends), and it turned into a full-blown passion. Now, I work in a GenAI team at a big company, where I basically get paid to play with smart AI tools and make them do awesome things. Not mad about it.
              </p>
            <p>
              I’ve got an integrated B.Tech + M.Tech in AI & ML. A fancy way of saying I spent years studying machines so they can think for us. I’ve also published a few research papers (yep, I nerd out even on weekends). You can find them on my LinkedIn.
              Debugging? I struggle with that. Which is why I make the AI do it for me. I mean, if I built it, it should help me out, right?            
              </p>
            <p>
              When I’m not training models or hacking prototypes, I’m probably smashing shuttles on a badminton court or planning a spontaneous trip. I love traveling and occasionally remembering to post about it on Instagram.
              I code hard, let AI handle the tough bugs, and always try to keep things fun.
              </p>


          </div>
        </div>
      </div>
    </section>
  )
}

export default About
