/*global window*/

import React from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {postSpeech} from '../store/speeches'
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
    this.recognition = null // Defining variable in constructor
  }

  componentDidMount() {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    if ('SpeechRecognition' in window) {
      this.recognition = new window.SpeechRecognition() // Create new speech recognition instance
      this.recognition.continuous = true // Will listen until explicitly told to stop
      this.recognition.interimResults = true // Adds results while recording
      this.recognition.onresult = async event => {
        let interimTranscript = ''
        for (
          let i = event.resultIndex, len = event.results.length;
          i < len;
          i++
        ) {
          let transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            // If transcript has been solidified
            this.finalTranscript += await transcript
            if (!this.state.isTranscribing) {
              // Only evaluate once done recording
              this.setState({
                ...this.state,
                transcript: this.finalTranscript.toLowerCase()
              })
              const length = Math.round(
                // Transcript length in seconds
                (this.state.endTime - this.state.startTime) / 1000
              )
              this.props.postSpeech(
                // Use thunk to create new speech recording
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
      let now = new Date() // get start time
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
      let now = new Date() // get end time
      await this.setState({...this.state, isTranscribing: toggle, endTime: now})
      this.recognition.stop() // Tell speechRecognition to stop recording
    } else {
      alert(
        'This browser does not support speech recognition. Please use Chrome or FireFox'
      )
    }
  }

  render() {
    return (
      <Timer initialTime={0} startImmediately={false}>
        {({start, stop}) => (
          <div className="recording-screen">
            <h1>Practice</h1>
            <h3>Start a new practice session and see how you're doing!</h3>
            <div className="recording-buttons">
              <Button
                onClick={() => {
                  start()
                  this.handleStart()
                }}
                variant="outlined"
                color="primary"
                disabled={this.state.isTranscribing}
              >
                Start
              </Button>
              <Button
                onClick={() => {
                  stop()
                  this.handleEnd()
                }}
                variant="outlined"
                color="secondary"
                disabled={!this.state.isTranscribing}
                m={10}
              >
                Stop!
              </Button>
            </div>
            <div id="timer">
              <Timer.Minutes
                formatValue={value => (value < 10 ? `0${value}` : value)}
              />{' '}
              :{' '}
              <Timer.Seconds
                formatValue={value => (value < 10 ? `0${value}` : value)}
              />
            </div>
          </div>
        )}
      </Timer>
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
