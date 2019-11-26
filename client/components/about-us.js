import React from 'react'

const AboutUs = () => {
  const linkedin =
    'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
  const github =
    'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
  return (
    <div id="profile-container">
      <h1>The Team</h1>

      <div className="profile">
        <img className="profile-picture" src="Haley.jpeg" />
        <div className="profile-details">
          <h3>Haley Sambursky</h3>
          <h4>Fullstack Software Engineer</h4>
          <a href="http://linkedin.com/in/haley-sambursky/">
            <img className="icon" src={linkedin} />
          </a>
          <a href="https://github.com/hay-sam">
            <img className="icon" src={github} />
          </a>
          <p>Description:</p>
        </div>
      </div>

      <div className="profile">
        <img className="profile-picture" src="Kiara.jpeg" />
        <div className="profile-details">
          <h3>Kiara Anderson</h3>
          <h4>Fullstack Software Engineer</h4>
          <a href="http://linkedin.com/in/kiara-m-anderson/">
            <img className="icon" src={linkedin} />
          </a>
          <a href="https://github.com/kiaramand">
            <img className="icon" src={github} />
          </a>
          <p>Description</p>
        </div>
      </div>

      <div className="profile">
        <img className="profile-picture" src="Lina.jpg" />
        <div className="profile-details">
          <h3>Lina Dinh</h3>
          <h4>Fullstack Software Engineer</h4>
          <a href="http://linkedin.com/in/lina-dinh/">
            <img className="icon" src={linkedin} />
          </a>
          <a href="https://github.com/linadinh2602">
            <img className="icon" src={github} />
          </a>
          <p>Description:</p>
        </div>
      </div>

      <div className="profile">
        <img className="profile-picture" src="Mallory.jpeg" />
        <div className="profile-details">
          <h3>Mallory LeeWong</h3>
          <h4>Fullstack Software Engineer</h4>
          <a href="http://linkedin.com/in/malloryleewong/">
            <img className="icon" src={linkedin} />
          </a>
          <a href="https://github.com/MalloryLeeWong">
            <img className="icon" src={github} />
          </a>
          <p>Description:</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
