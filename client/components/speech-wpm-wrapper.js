/* eslint-disable no-new */
/* eslint-disable react/no-string-refs */
import React, {Component} from 'react'
import D3Chart from './speech-wpm-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

class SpeechFillerWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wpmInfo: {
        title: '',
        description: ''
      }
    }
    this.speech = this.props.speech
  }
  async refresh(speech) {
    const {data} = await axios.get(`/api/wpm/${speech.wpm}`)
    this.setState({
      wpmInfo: data
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.speech) {
      this.refresh(nextProps.speech)
      new D3Chart(this.refs.speechWPM, nextProps.speech, this.state.wpmInfo)
    }
  }

  render() {
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="speechWPM" />
        <Paper elevation={2}>
          <Typography variant="h5">Words Per Minute</Typography>
          <hr />
          <Typography variant="body1" component="p">
            Your pace was {this.props.speech.wpm} words per minute! That's
            considered a "{this.state.wpmInfo.title}" pace!
          </Typography>
        </Paper>
      </Paper>
    )
  }
}

export default SpeechFillerWrapper
