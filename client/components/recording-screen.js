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
      transcript: ''
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
  }

  handleStart() {
    let toggle = !this.state.isTranscribing
    let now = new Date()
    this.setState({...this.state, startTime: now, isTranscribing: toggle})

    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    if (!('SpeechRecognition' in window)) {
      //speech recognition API NOT supported
      //show error message
      return
    }

    const recognition = new window.SpeechRecognition()

    recognition.onresult = event => {
      const speechToText = event.results[0][0].transcript
      this.setState({...this.state, transcript: speechToText})
      console.log(speechToText)
    }

    recognition.start() //will ask user for permission to access microphone
  }

  handleEnd() {
    let toggle = !this.state.isTranscribing
    let now = new Date()
    this.setState({...this.state, endTime: now, isTranscribing: toggle})
  }

  render() {
    return (
      <div>
        <h1>Practice</h1>
        <h3>Start a new practice session and see how you're doing</h3>
        <Button onClick={this.handleStart}>Start</Button>
        <Button onClick={this.handleEnd}>Stop</Button>
        <p>***Placeholder: progress bar***</p>
      </div>
    )
  }
}
export default RecordingScreen
