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
            ability and elevate confidence.
          </div>
        </div>
        <img className="about-image" src="podium-graphic-v2.png" />
      </div>
      <div className="about-titles">Let Podium be your coach.</div>
      <div className="about-tiles">
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="chart.png" />
            <div className="about-text">
              Log in to record new sessions and track your progress over time
            </div>
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
              Learn about your habits and understand your strengths and
              weaknesses
            </div>
          </div>
        </Paper>
        <Paper className="about-paper" elevation={4}>
          <div className="about-tile">
            <img className="tile-icon" src="speech.png" />
            <div className="about-text">
              Gain insight into how your words will be received
            </div>
          </div>
        </Paper>
      </div>
      <div className="about-titles">Meet the team.</div>
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
      <div className="about-titles">Check out the tech.</div>
      <div className="about-tiles">
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://reactjs.org/docs/getting-started.html"
            title="React"
            target="_blank"
          >
            <CardMedia className="tech-img" image="react.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://redux.js.org/introduction/getting-started"
            title="Redux"
            target="_blank"
          >
            <CardMedia className="tech-img" image="cropped-redux.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://github.com/d3/d3/wiki"
            title="D3"
            target="_blank"
          >
            <CardMedia className="tech-img" image="d3.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://www.postgresql.org/"
            title="PostgreSQL"
            target="_blank"
          >
            <CardMedia className="tech-img" image="cropped-postgresql.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://sequelize.org/master/manual/getting-started.html"
            title="Sequelize"
            target="_blank"
          >
            <CardMedia className="tech-img" image="sequelize.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://nodejs.org/en/about/"
            title="Node.js"
            target="_blank"
          >
            <CardMedia className="tech-img" image="node.png" />
          </CardActionArea>
        </Card>
        <Card className="tech-card" elevation={4}>
          <CardActionArea
            href="https://material-ui.com/getting-started/installation/"
            title="Material-UI"
            target="_blank"
          >
            <CardMedia className="tech-img" image="cropped-material-ui.png" />
          </CardActionArea>
        </Card>
      </div>
    </div>
  )
}

export default Home
