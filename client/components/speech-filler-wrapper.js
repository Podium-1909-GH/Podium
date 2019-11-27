import React, {Component} from 'react'
import D3Chart from './speech-filler-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class SpeechFillerWrapper extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.fillerObj) {
      // eslint-disable-next-line no-new
      new D3Chart(this.refs.speechFiller, nextProps.fillerObj)
    }
  }

  render() {
    let totalFillerCount = Object.values(this.props.fillerObj).reduce(
      (accum, arr) => {
        if (arr.length > 0) {
          accum += arr.length
        }
        return accum
      },
      0
    )

    let totalWordsCount = this.props.speech.transcript.split(' ').length
    let percentFiller = Math.round(totalFillerCount / totalWordsCount * 100)

    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="speechFiller" />
        <Paper elevation={2}>
          <Typography variant="h5">Filler Word Ratio</Typography>
          <hr />
          <Typography variant="body1" component="p">
            {percentFiller}% of your words were filler words
          </Typography>
        </Paper>
      </Paper>
    )
  }
}

export default SpeechFillerWrapper