import React, {Component} from 'react'
import D3Chart from './speech-filler-d3'

class SpeechFillerWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.refs.speechFiller, this.props.fillerObj)
    })
  }

  shouldComponentUpdate() {
    // should not react re-render when something changes, we'll manually update
    return false
  }

  componentWillReceiveProps() {
    // run as soon as new props become available before any updates
    this.state.chart.update()
  }

  render() {
    return <div ref="speechFiller" />
  }
}

export default SpeechFillerWrapper
