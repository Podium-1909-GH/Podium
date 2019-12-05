/* eslint-disable react/no-deprecated */
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
    this.chart = null
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
      if (this.chart === null) {
        this.chart = new D3Chart(
          this.refs.speechWPM,
          nextProps.speech,
          this.state.wpmInfo
        )
      }
    }
  }

  render() {
    return (
      <div className="dashboard-item">
        <Paper className="dashboard-chart" elevation={4}>
          <a name="wpm">
            <div ref="speechWPM" />
          </a>
        </Paper>
        <Paper elevation={4} className="dashboard-item-text">
          <Typography variant="h5">Words Per Minute</Typography>
          <hr />
          <Typography variant="body1" component="p">
            Your pace was {this.props.speech.wpm} words per minute! That's
            considered a "{this.state.wpmInfo.title}" pace!{' '}
            {this.state.wpmInfo.description}
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default SpeechFillerWrapper
