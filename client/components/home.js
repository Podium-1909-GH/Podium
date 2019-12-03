import React from 'react'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import {CardMedia, CardContent, CardActionArea} from '@material-ui/core'

//about Podium page
const Home = () => {
  const linkedin =
    'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
  const github =
    'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
  return (
    <div className="about">
      <div className="about-header">
        <div className="about-title">
          <div className="about-tagline">Leave an impression.</div>
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
            <div className="about-text">Set goals and track your progress</div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="like.png" />
            <div className="about-text">
              Practice a speech, talk, or presentation and receive immediate
              feedback
            </div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="pace3.png" />
            <div className="about-text">
              Learn about your habits and compare to well known speakers
            </div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="speech.png" />
            <div className="about-text">Pace, filler words, and sentiment</div>
          </div>
        </Paper>
      </div>
      <div className="about-titles">meet the team</div>
      <div className="team">
        <Card className="team-card" elevation={4}>
          <CardActionArea
            href="http://linkedin.com/in/haley-sambursky/"
            target="_blank"
          >
            <CardMedia className="team-img" image="Haley.jpeg" title="Haley" />
          </CardActionArea>
          <CardContent>
            <div className="team-member">Haley Sambursky</div>
            <div>
              <a href="http://linkedin.com/in/haley-sambursky/" target="_blank">
                <img className="icon" src={linkedin} />
              </a>
              <a href="https://github.com/hay-sam" target="_blank">
                <img className="icon" src={github} />
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="team-card" elevation={4}>
          <CardActionArea
            href="http://linkedin.com/in/lina-dinh/"
            target="_blank"
          >
            <CardMedia className="team-img" image="Lina.jpg" title="Lina" />
          </CardActionArea>
          <CardContent>
            <div className="team-member">Lina Dinh</div>
            <div>
              <a href="http://linkedin.com/in/lina-dinh/" target="_blank">
                <img className="icon" src={linkedin} />
              </a>
              <a href="https://github.com/linadinh2602" target="_blank">
                <img className="icon" src={github} />
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="team-card" elevation={4}>
          <CardActionArea
            href="http://linkedin.com/in/kiara-m-anderson/"
            target="_blank"
          >
            <CardMedia className="team-img" image="Kiara.jpeg" title="Kiara" />
          </CardActionArea>
          <CardContent>
            <div className="team-member">Kiara Anderson</div>
            <div>
              <a
                href="http://linkedin.com/in/kiara-m-anderson/"
                target="_blank"
              >
                <img className="icon" src={linkedin} />
              </a>
              <a href="https://github.com/kiaramand" target="_blank">
                <img className="icon" src={github} />
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="team-card" elevation={4}>
          <CardActionArea
            href="http://linkedin.com/in/malloryleewong/"
            target="_blank"
          >
            <CardMedia
              className="team-img"
              image="Mallory.jpeg"
              title="Mallory"
            />
          </CardActionArea>
          <CardContent>
            <div className="team-member">Mallory LeeWong</div>
            <div>
              <a href="http://linkedin.com/in/malloryleewong/" target="_blank">
                <img className="icon" src={linkedin} />
              </a>
              <a href="https://github.com/MalloryLeeWong" target="_blank">
                <img className="icon" src={github} />
              </a>
            </div>
          </CardContent>
        </Card>
        {/*
        <Avatar alt="Lina" src="Lina.jpg" className="team-avatar" />
        <Avatar alt="Mallory" src="Mallory.jpeg" className="team-avatar" /> */}
      </div>
      <div className="about-titles">check out the tech</div>
      <div className="about-tiles">
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://reactjs.org/docs/getting-started.html"
            target="_blank"
          >
            <CardMedia className="tech-img" image="react.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://redux.js.org/introduction/getting-started"
            target="_blank"
          >
            <CardMedia className="tech-img" image="redux.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://material-ui.com/getting-started/installation/"
            target="_blank"
          >
            <CardMedia className="tech-img" image="material-ui.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea href="https://github.com/d3/d3/wiki" target="_blank">
            <CardMedia className="tech-img" image="d3.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea href="https://www.postgresql.org/" target="_blank">
            <CardMedia className="tech-img" image="postgresql.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="hhttps://sequelize.org/master/manual/getting-started.html"
            target="_blank"
          >
            <CardMedia className="tech-img" image="sequelize.png" />
          </CardActionArea>
        </Card>
      </div>
    </div>
  )
}

export default Home
