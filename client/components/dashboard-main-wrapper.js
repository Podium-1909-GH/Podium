import React, {Component} from 'react'
import DashBoardMainD3 from './dashboard-main-d3'
import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'

class DashboardMainWrapper extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.speeches) {
      // eslint-disable-next-line no-new
      new DashBoardMainD3(this.refs.dashMain, nextProps.speeches)
    }
  }

  render() {
    console.log('* render in dashboard main wrapper *')
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="dashMain" />
      </Paper>
    )
  }
}

export default DashboardMainWrapper
