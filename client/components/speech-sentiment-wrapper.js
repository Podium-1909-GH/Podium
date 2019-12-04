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
      {name: 'Positive', count: sentiment.positive.length, color: '#2ECC71 '},
      {name: 'Negative', count: sentiment.negative.length, color: '#E67E22'},
      {
        name: 'Neutral',
        count:
          sentiment.tokens.length -
          sentiment.positive.length -
          sentiment.negative.length,
        color: '#D6EAF8'
      }
    ]

    this.filterSentimentData = sentimentData.filter(data => data.count > 0)
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="speechSentimentPieChart" />
        <Paper elevation={2}>
          <Typography variant="h5">Speech Sentiment Ratios</Typography>
          <hr />
          <Typography variant="body1" component="div">
            Overal of your speech, you use:
            {sentimentData.map(category => {
              if (category.count > 0) {
                return (
                  <li className="sentiment-rate-details">
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
        </Paper>
      </Paper>
    )
  }
}

export default SpeechSentimentWrapper
