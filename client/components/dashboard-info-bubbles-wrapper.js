import React, {Component} from 'react'
import DashboardBubbles from './dashboard-info-bubbles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class DashboardInfoBubblesWrapper extends Component {
  // important to put in component did mount because we're changing something that already loaded to screen
  constructor(props) {
    super(props)
    this.speeches = [...this.props.speeches]
  }

  componentDidMount() {
    this.setState({
      chart: new DashboardBubbles(this.refs.dashbubbles, this.speeches)
    })
  }

  shouldComponentUpdate() {
    // should not react re-render when something changes, we'll manually update
    return false
  }

  render() {
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="dashbubbles" />
      </Paper>
    )
  }
}

export default DashboardInfoBubblesWrapper
