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

    this.filterSentimentData = sentimentData.filter(data => data.count > 0)
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="speechSentimentPieChart" />
        <Paper elevation={2}>
          <Typography variant="h5">Sentiment Ratios</Typography>
          <hr />
          <Typography variant="body1" component="div">
            <li>{`Positive: ${sentimentData[0].count} words`}</li>
            <li>{`Negative: ${sentimentData[1].count} words`}</li>
            <li>{`Neutral: ${sentimentData[2].count} words`}</li>
          </Typography>
        </Paper>
      </Paper>
    )
  }
}

export default SpeechSentimentWrapper
