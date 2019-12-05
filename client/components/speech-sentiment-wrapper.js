/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-deprecated */
/* eslint-disable no-new */
import React, {Component} from 'react'
import D3SentimentChart from './speech-sentiment-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class SpeechSentimentWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sentimentData: []
    }
    this.chart = null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sentiment) {
      let sentimentData = [
        {
          name: 'Positive',
          count: nextProps.sentiment.positive.length,
          color: '#11C3D0'
        },
        {
          name: 'Negative',
          count: nextProps.sentiment.negative.length,
          color: '#E445A8'
        },
        {
          name: 'Neutral',
          count:
            nextProps.sentiment.tokens.length -
            nextProps.sentiment.positive.length -
            nextProps.sentiment.negative.length,
          color: '#4652B1'
        }
      ]

      this.filterSentimentData = sentimentData.filter(data => data.count > 0)
      this.setState({sentimentData})
      if (this.chart === null) {
        this.chart = new D3SentimentChart(
          this.refs.speechSentimentPieChart,
          this.filterSentimentData
        )
      }
    }
  }

  render() {
    return (
      <div className="dashboard-item">
        <Paper elevation={4} className="dashboard-item-text">
          <Typography variant="h5">Speech Sentiment Ratios</Typography>
          <hr />
          <Typography variant="body1" component="div">
            In your speech, you used:
            {this.state.sentimentData.map(category => {
              if (category.count > 0) {
                return (
                  <li
                    className="sentiment-rate-details-speech"
                    key={category.name}
                  >
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
            style={{marginBottom: '0px', textAlign: 'center'}}
            // className="sentiment-color-detail"
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
          <a name="sentiment">
            <div ref="speechSentimentPieChart" />
          </a>
        </Paper>
      </div>
    )
  }
}

export default SpeechSentimentWrapper
