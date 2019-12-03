import React from 'react'
import Paper from '@material-ui/core/Paper'

//about Podium page
const Home = () => {
  return (
    <div className="about">
      <div className="about-header">
        <div>
          practice a speech, talk, or presentation and receive immediate
          feedback
        </div>
        <div>image</div>
      </div>
      <div className="about-tiles">
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="chart.png" />
            <div>set goals and track your progress</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="pace3.png" />
            <div>
              learn about your habits and compare to well known speakers
            </div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="speech.png" />
            <div>pace, filler words, and sentiment</div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default Home
