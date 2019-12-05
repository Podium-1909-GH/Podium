/* eslint-disable react/no-string-refs */
import React, {Component} from 'react'
import D3Chart from './speech-filler-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class SpeechFillerWrapper extends Component {
  constructor() {
    super()
    this.chart = null
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.fillerObj) {
      if (this.chart === null) {
        this.chart = new D3Chart(this.refs.speechFiller, nextProps.fillerObj)
      }
    }
  }

  render() {
    let totalWordsCount = this.props.speech.transcript.split(' ').length
    let percentFiller = Math.round(
      this.props.speech.numberFiller / totalWordsCount * 100
    )

    return (
      <React.Fragment>
        <a name="filler" />
        <div className="dashboard-item">
          <Paper className="dashboard-chart" elevation={4}>
            <div ref="speechFiller" />
          </Paper>
          <Paper elevation={4} className="dashboard-item-text">
            <Typography variant="h5">Filler Word Ratio</Typography>
            <hr />
            <Typography variant="body1" component="p">
              {percentFiller}% of your words were filler words.
            </Typography>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export default SpeechFillerWrapper
