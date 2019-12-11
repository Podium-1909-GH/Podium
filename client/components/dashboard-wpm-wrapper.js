/* eslint-disable react/no-string-refs */
import React, {Component} from 'react'
import DashBoardWpmD3 from './dashboard-wpm-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

class DashboardWpmWrapper extends Component {
  // important to put in component did mount because we're changing something that already loaded to screen
  constructor(props) {
    super(props)
    this.speeches = this.props.speeches
    this.state = {
      wpm: {
        title: '',
        description: ''
      }
    }
    this.aveWpm = Math.round(
      // Calculate average words per minute from most recent speeches
      this.speeches.reduce((accum, speech) => accum + speech.wpm, 0) /
        this.speeches.length
    )
  }
  async componentDidMount() {
    const {data} = await axios.get(`/api/wpm/${this.aveWpm}`) // Retrieve wpm description and title for wpm
    await this.setState({
      wpm: data,
      // eslint-disable-next-line react/no-unused-state
      chart: new DashBoardWpmD3(this.refs.dashWpm, this.speeches)
    })
  }

  shouldComponentUpdate() {
    // should not react re-render when something changes, we'll manually update
    return true
  }

  render() {
    return (
      <div className="dashboard-item">
        <Paper className="dashboard-chart" elevation={4}>
          <a name="wpm">
            <div ref="dashWpm" className="svg-item" />
          </a>
        </Paper>
        <Paper elevation={4}>
          <Typography variant="h5">Words Per Minute</Typography>
          <hr />
          <Typography
            variant="body1"
            component="p"
            className="dashboard-item-text"
          >
            Your Average Speed is {this.aveWpm} words per minute for your last{' '}
            {this.speeches.length} speeches! That's considered "{
              this.state.wpm.title
            }" pace! {this.state.wpm.description}
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default DashboardWpmWrapper
