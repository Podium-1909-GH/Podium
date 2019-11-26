import React, {Component} from 'react'
import DashBoardWpmD3 from './dashboard-wpm-d3'

class DashboardWpmWrapper extends Component {
  // important to put in component did mount because we're changing something that already loaded to screen
  constructor(props) {
    super(props)
    this.speeches = this.props.speeches
  }
  componentDidMount() {
    this.setState({
      chart: new DashBoardWpmD3(this.refs.dashWpm, this.speeches)
    })
  }

  shouldComponentUpdate() {
    // should not react re-render when something changes, we'll manually update
    return true
  }

  render() {
    return <div ref="dashWpm" />
  }
}

export default DashboardWpmWrapper
