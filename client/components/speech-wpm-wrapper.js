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
  async componentDidMount() {
    const {data} = await axios.get(`/api/wpm/${this.speech.wpm}`)
    console.log(this.state, data, 'speech', this.speech)
    this.setState({
      wpmInfo: data,
      chart: new D3Chart(this.refs.speechWPM, this.speech)
    })
    console.log(this.state, 'speech:', this.speech)
  }

  render() {
    console.log(
      'wrapper render',
      this.speech,
      'speech info',
      this.state.wpmInfo
    )
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
