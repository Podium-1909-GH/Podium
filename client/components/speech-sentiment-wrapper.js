/* eslint-disable no-new */
import React, {Component} from 'react'
import D3SpeechSentimentChart from './speech-sentiment-d3'

class SpeechSentimentWrapper extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('HEREERERERE')
    if (nextProps.sentiment) {
      new D3SpeechSentimentChart(
        this.refs.speechSentimentPieChart,
        nextProps.sentiment
      )
    }
  }

  render() {
    return <div ref="speechSentimentPieChart" />
  }
}

export default SpeechSentimentWrapper
