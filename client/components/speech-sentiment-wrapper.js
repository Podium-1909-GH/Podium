/* eslint-disable no-new */
import React, {Component} from 'react'
import D3SpeechSentimentChart from './speech-sentiment-d3'

export default class SpeechSentimentWrapper extends Component {
  constructor(props) {
    super(props)
    this.sentiment = this.props.sentiment
  }

  componentWillReceiveProps(nextProps) {
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
