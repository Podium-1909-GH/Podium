import React, {Component} from 'react'
import DashBoardMainD3 from './dashboard-main-d3'
import Paper from '@material-ui/core/Paper'
import {connect} from 'react-redux'

class DashboardMainWrapper extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentDidMount() {
    // eslint-disable-next-line no-new
    new DashBoardMainD3(this.refs.dashMain, this.props.speeches)
  }

  render() {
    console.log('* render in dashboard main wrapper *')
    // eslint-disable-next-line no-new
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="dashMain" />
      </Paper>
    )
  }
}

const mapState = state => {
  return {
    speeches: state.speeches
  }
}

export default connect(mapState)(DashboardMainWrapper)
