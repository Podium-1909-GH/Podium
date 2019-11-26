/*global window*/

import React from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {postSpeech} from '../store/speeches'
import SpeechOverview from './speech-overview'
import Timer from 'react-compound-timer'

class RecordingScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      isTranscribing: false,
      startTime: '',
      endTime: '',
      transcript: '',
      supported: true
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
    this.finalTranscript = ''
    this.recognition = null
  }

  componentDidMount() {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    if ('SpeechRecognition' in window) {
      this.recognition = new window.SpeechRecognition()
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.onresult = async event => {
        let interimTranscript = ''
        for (
          let i = event.resultIndex, len = event.results.length;
          i < len;
          i++
        ) {
          let transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            this.finalTranscript += await transcript
            if (!this.state.isTranscribing) {
              this.setState({
                ...this.state,
                transcript: this.finalTranscript.toLowerCase()
              })
              const length = Math.round(
                (this.state.endTime - this.state.startTime) / 1000
              )
              this.props.postSpeech(
                this.state.transcript,
                length,
                this.props.userId
              )
            }
          } else {
            interimTranscript += transcript
          }
        }
      }
    } else {
      //NOTE: this is not yet working
      //speech recognition API NOT supported
      this.setState({...this.state, supported: false})
      alert(
        'This browser does not support speech recognition. Please use Chrome or FireFox'
      )
    }
  }

  async handleStart() {
    if (this.state.supported) {
      let now = new Date()
      let toggle = !this.state.isTranscribing
      await this.setState({
        ...this.state,
        startTime: now,
        isTranscribing: toggle
      })
      this.recognition.start() //will ask user for permission to access microphone
    } else {
      alert(
        'This browser does not support speech recognition. Please use Chrome or FireFox'
      )
    }
  }

  async handleEnd() {
    if (this.state.supported) {
      let toggle = !this.state.isTranscribing
      let now = new Date()
      await this.setState({...this.state, isTranscribing: toggle, endTime: now})
      this.recognition.stop()
    } else {
      alert(
        'This browser does not support speech recognition. Please use Chrome or FireFox'
      )
    }
  }

  render() {
    return (
      <div className="recording-screen">
        <h1>Practice</h1>
        <h3>Start a new practice session and see how you're doing!</h3>
        <div className="recording-buttons">
          <Button
            onClick={this.handleStart}
            variant="outlined"
            color="primary"
            disabled={this.state.isTranscribing}
          >
            Start
          </Button>
          <Button
            onClick={this.handleEnd}
            variant="outlined"
            color="secondary"
            disabled={!this.state.isTranscribing}
            m={10}
          >
            Stop!
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  postSpeech: (transcript, length, userId) =>
    dispatch(postSpeech(transcript, length, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordingScreen)
