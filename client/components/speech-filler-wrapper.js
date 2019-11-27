import React, {Component} from 'react'
import D3Chart from './speech-filler-d3'

class SpeechFillerWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.refs.speechFiller, this.props.fillerObj)
    })
    console.log('component did mount in SPEECH WRAPPER')
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    console.log('RENDER IN SPEECH WRAPPER')
    return <div ref="speechFiller" />
  }
}

export default SpeechFillerWrapper
