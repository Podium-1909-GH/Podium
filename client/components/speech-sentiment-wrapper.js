/* eslint-disable no-new */
import React, {Component} from 'react'
import D3SentimentChart from './speech-sentiment-d3'

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
    return <div ref="speechSentimentPieChart" />
  }
}

export default SpeechSentimentWrapper
