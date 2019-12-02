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
    this.setState({
      chart: new D3SentimentChart(this.refs.dashSentiment, this.aveSentiment)
    })
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    // need each speech sentiment to be a JSON instead of string

    this.speeches.forEach(speech => {
      speech.sentiment = JSON.parse(speech.sentiment)
    })

    const positiveCount = this.speeches.reduce(
      (accum, speech) => accum + speech.sentiment.positive.length,
      0
    )
    const negativeCount = this.speeches.reduce(
      (accum, speech) => accum + speech.sentiment.negative.length,
      0
    )
    const totalTokens = this.speeches.reduce(
      (accum, speech) => accum + speech.sentiment.tokens.length,
      0
    )

    this.aveSentiment = [
      {name: 'Positive', count: positiveCount},
      {name: 'Negative', count: negativeCount},
      {name: 'Neutral', count: totalTokens - positiveCount - negativeCount}
    ]

    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="dashSentiment" />
        <Paper elevation={2}>
          <Typography variant="h5">Sentiment Ratios</Typography>
          <hr />
          <Typography variant="body1" component="div">
            <li>{`Positive: ${this.aveSentiment[0].count} words`}</li>
            <li>{`Negative: ${this.aveSentiment[1].count} words`}</li>
            <li>{`Neutral: ${this.aveSentiment[2].count} words`}</li>
          </Typography>
        </Paper>
      </Paper>
    )
  }
}

export default DashboardSentimentWrapper
