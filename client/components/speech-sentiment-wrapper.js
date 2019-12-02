/* eslint-disable no-new */
import React, {Component} from 'react'
import D3SentimentChart from './speech-sentiment-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class SpeechSentimentWrapper extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.sentiment) {
      let sentiment = nextProps.sentiment

      let sentimentData = [
        {name: 'Positive', count: sentiment.positive.length},
        {name: 'Negative', count: sentiment.negative.length},
        {
          name: 'Neutral',
          count:
            sentiment.tokens.length -
            sentiment.positive.length -
            sentiment.negative.length
        }
      ]

      const filterSentimentData = sentimentData.filter(data => data.count > 0)
      new D3SentimentChart(
        this.refs.speechSentimentPieChart,
        filterSentimentData
      )
    }
  }

  render() {
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="speechSentimentPieChart" />
        <Paper elevation={2}>
          <Typography variant="h5">Sentiment Ratios</Typography>
          <hr />
          <Typography variant="body1" component="div" />
        </Paper>
      </Paper>
    )
  }
}

export default SpeechSentimentWrapper
