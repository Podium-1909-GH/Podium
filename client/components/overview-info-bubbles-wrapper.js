import React, {Component} from 'react'
import D3Bubbles from './overview-info-bubbles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class D3BubblesWrapper extends Component {
  // important to put in component did mount because we're changing something that already loaded to screen
  constructor(props) {
    super(props)
    this.speech = this.props.speech
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.speech) {
      // eslint-disable-next-line no-new
      new D3Bubbles(this.refs.bubbles, nextProps.speech)
    }
  }

  shouldComponentUpdate() {
    // should not react re-render when something changes, we'll manually update
    return false
  }

  render() {
    return (
      <Paper className="dashboard-item" elevation={4}>
        <div ref="bubbles" />
      </Paper>
    )
  }
}

export default D3BubblesWrapper
