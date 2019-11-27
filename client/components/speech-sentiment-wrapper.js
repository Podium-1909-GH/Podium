import React, {Component} from 'react'
import D3SpeechSentimentChart from './speech-sentiment-d3'

export default class SpeechSentimentWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3SpeechSentimentChart(
        this.refs.speechSentimentPieChart,
        this.props.sentiment
      )
    })
  }
  shouldComponentUpdate() {
    return false
  }

  // componentWillReceiveProps(nextProps) {
  // 	this.state.chart.update(nextProps.sentiment)
  // }

  render() {
    return <div ref="speechSentimentPieChart" />
  }
}
