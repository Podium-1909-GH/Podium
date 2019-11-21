/*global window*/

import React from 'react'
import Button from '@material-ui/core/Button'

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

    this.recognition = null
  }

  componentDidMount() {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    if ('SpeechRecognition' in window) {
      this.recognition = new window.SpeechRecognition()
      this.recognition.continuous = true
      this.recognition.onresult = event => {
        console.log('inside the onresult function!!!')
        const speechToText = event.results[0][0].transcript
        console.log(speechToText)
        this.setState({...this.state, transcript: speechToText})
        //console.log(this.state)
        const length = Math.round(
          (this.state.endTime - this.state.startTime) / 1000
        )
        //dispatch thunk
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

  handleStart() {
    if (this.state.supported) {
      let now = new Date()
      let toggle = !this.state.isTranscribing
      this.setState({...this.state, startTime: now, isTranscribing: toggle})
      this.recognition.start() //will ask user for permission to access microphone
      console.log('started!!!')
    } else {
      alert(
        'This browser does not support speech recognition. Please use Chrome or FireFox'
      )
    }
  }

  handleEnd() {
    if (this.state.supported) {
      let now = new Date()
      this.recognition.stop()
      console.log('stopped!!!')
      let toggle = !this.state.isTranscribing
      this.setState({...this.state, endTime: now, isTranscribing: toggle})
    } else {
      alert(
        'This browser does not support speech recognition. Please use Chrome or FireFox'
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Practice</h1>
        <h3>Start a new practice session and see how you're doing</h3>
        <Button onClick={this.handleStart} disabled={this.state.isTranscribing}>
          Start
        </Button>
        <Button onClick={this.handleEnd} disabled={!this.state.isTranscribing}>
          Stop
        </Button>
        <p>***Placeholder: progress bar***</p>
      </div>
    )
  }
}
export default RecordingScreen
