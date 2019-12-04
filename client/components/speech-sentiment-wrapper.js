/* eslint-disable no-new */
import React, {Component} from 'react'
import D3SentimentChart from './speech-sentiment-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class SpeechSentimentWrapper extends Component {
  componentDidMount() {
    if (this.filterSentimentData) {
      new D3SentimentChart(
        this.refs.speechSentimentPieChart,
        this.filterSentimentData
      )
    }
  }

  render() {
    let {sentiment} = this.props
    let sentimentData = [
      {name: 'Positive', count: sentiment.positive.length, color: '#11C3D0'},
      {name: 'Negative', count: sentiment.negative.length, color: '#E445A8'},
      {
        name: 'Neutral',
        count:
          sentiment.tokens.length -
          sentiment.positive.length -
          sentiment.negative.length,
        color: '#4652B1'
      }
    ]

    this.filterSentimentData = sentimentData.filter(data => data.count > 0)
    return (
      <div className="dashboard-item">
        <Paper elevation={4} className="dashboard-item-text">
          <Typography variant="h5">Speech Sentiment Ratios</Typography>
          <hr />
          <Typography variant="body1" component="div">
            In your speech, you used:
            {sentimentData.map(category => {
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
                      {category.name}: {category.count} words
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
            style={{'margin-bottom': '0px'}}
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
        <Paper className="dashboard-chart" elevation={4}>
          <div ref="speechSentimentPieChart" />
        </Paper>
      </div>
    )
  }
}

export default SpeechSentimentWrapper
