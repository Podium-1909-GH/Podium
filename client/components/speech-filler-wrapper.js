import React, {Component} from 'react'
import D3Chart from './speech-filler-d3'

class SpeechFillerWrapper extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.fillerObj) {
      // eslint-disable-next-line no-new
      new D3Chart(this.refs.speechFiller, nextProps.fillerObj)
    }
  }

  render() {
    return <div ref="speechFiller" />
  }
}

export default SpeechFillerWrapper
