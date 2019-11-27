import React, {Component} from 'react'
import DashBoardWpmD3 from './dashboard-wpm-d3'
import Paper from '@material-ui/core/Paper'

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
    return false
  }

  render() {
    const aveWpm = Math.round(
      this.speeches.reduce((accum, speech) => accum + speech.wpm, 0) /
        this.speeches.length
    )
    return (
      <Paper className="dashboard-item" elevation={4}>
        <Paper ref="dashWpm" elevation={3} />
        <Paper elevation={3}>
          <p>
            Your Average Speed is {aveWpm} words per minute! That's as fast as a
            real person
          </p>
        </Paper>
      </Paper>
    )
  }
}

export default DashboardWpmWrapper
