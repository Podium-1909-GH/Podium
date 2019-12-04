import React, {Component} from 'react'
import D3SentimentChart from './speech-sentiment-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class DashboardSentimentWrapper extends Component {
  constructor(props) {
    super(props)
    this.speeches = [...this.props.speeches]
  }

  componentDidMount() {
    if (this.filterSentimentSpeeches) {
      this.setState({
        chart: new D3SentimentChart(
          this.refs.dashSentiment,
          this.filterSentimentSpeeches
        )
      })
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    // need each speech sentiment to be a JSON instead of string
    this.speeches.forEach(speech => {
      speech.sentiment = JSON.parse(speech.sentiment)
    })

    const positiveCount = this.speeches.reduce((accum, speech) => {
      if (speech.sentiment.comparative > 0.01) {
        accum += 1
      }
      return accum
    }, 0)

    const negativeCount = this.speeches.reduce((accum, speech) => {
      if (speech.sentiment.comparative < -0.01) {
        accum += 1
      }
      return accum
    }, 0)

    const neutralCount = this.speeches.length - positiveCount - negativeCount

    this.aveSentiment = [
      {name: 'Positive', count: positiveCount, color: '#11C3D0'},
      {name: 'Negative', count: negativeCount, color: '#E445A8'},
      {name: 'Neutral', count: neutralCount, color: '#4652B1'}
    ]

    this.filterSentimentSpeeches = this.aveSentiment.filter(
      data => data.count > 0
    )

    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="dashSentiment" />
        <Paper elevation={2}>
          <Typography variant="h5">Sentiment Analysis</Typography>
          <hr />
          <Typography variant="body1" component="div">
            A breakdown of how your last {this.speeches.length} speeches were
            rated:
            {this.aveSentiment.map(category => {
              if (category.count > 0) {
                return (
                  <li className="sentiment-rate-details" key={category.name}>
                    <div
                      className="sentiment-color-detail"
                      style={{
                        height: '18px',
                        width: '18px',
                        backgroundColor: `${category.color}`
                      }}
                    >
                      {' '}
                    </div>
                    <span>
                      {category.name}: {category.count}{' '}
                    </span>
                  </li>
                )
              }
            })}
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Typography
            variant="caption"
            component="p"
            style={{marginBottom: '0px'}}
          >
            You can read more about sentiment analysis{' '}
            <a
              href="https://www.lexalytics.com/technology/sentiment-analysis"
              target="_blank"
            >
              here
            </a>!
          </Typography>
        </Paper>
      </Paper>
    )
  }
}

export default DashboardSentimentWrapper
