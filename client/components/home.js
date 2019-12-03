import React from 'react'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

//about Podium page
const Home = () => {
  return (
    <div className="about">
      <div className="about-header">
        <div className="about-text">
          <div className="about-tagline">Make your statement.</div>
          <div>
            Podium is a personalized solution designed to polish speaking
            ability and grow confidence.
          </div>
        </div>
        <img className="about-image" src="podium-graphic-v2.png" />
      </div>
      <div className="about-titles">let Podium be your coach</div>
      <div className="about-tiles">
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="chart.png" />
            <div>Set goals and track your progress</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="like.png" />
            <div>
              Practice a speech, talk, or presentation and receive immediate
              feedback
            </div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="pace3.png" />
            <div>
              Learn about your habits and compare to well known speakers
            </div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="speech.png" />
            <div>Pace, filler words, and sentiment</div>
          </div>
        </Paper>
      </div>
      <div className="about-titles">meet the team</div>
      <div className="team">
        <Avatar alt="Kiara" src="Kiara.jpeg" className="team-avatar" />
        <Avatar alt="Haley" src="Haley.jpeg" className="team-avatar" />
        <Avatar alt="Lina" src="Lina.jpg" className="team-avatar" />
        <Avatar alt="Mallory" src="Mallory.jpeg" className="team-avatar" />
      </div>
      <div className="about-titles">about the tech</div>
      <div className="about-tiles">
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="react.png" />
            <div>React</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="redux.png" />
            <div>Redux</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="material-ui.png" />
            <div>Material-UI</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="d3.png" />
            <div>D3</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="graph.png" />
            <div>APIs</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="postgresql.png" />
            <div>PostgreSQL</div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default Home
