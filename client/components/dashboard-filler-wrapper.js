import React, {Component} from 'react'
import DashBoardWpmD3 from './dashboard-filler-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class DashboardFillerWrapper extends Component {
  // important to put in component did mount because we're changing something that already loaded to screen
  constructor(props) {
    super(props)
    this.speeches = this.props.speeches
  }
  componentDidMount() {
    this.setState({
      chart: new DashBoardWpmD3(this.refs.dashFiller, this.speeches)
    })
  }

  shouldComponentUpdate() {
    // should not react re-render when something changes, we'll manually update
    return false
  }

  render() {
    const percentFiller = Math.round(
      100 *
        (this.speeches.reduce(
          (accum, speech) => accum + speech.numberFiller,
          0
        ) /
          this.speeches.reduce(
            (accum, speech) => accum + speech.transcript.split(' ').length,
            0
          ))
    )
    let totalFillerCount = this.speeches.reduce((accum, speech) => {
      let fillerParsed = JSON.parse(speech.fillerObj)
      let speechKeys = Object.keys(fillerParsed)
      speechKeys.forEach(key => {
        if (fillerParsed[key].length > 0) {
          if (accum[key]) {
            accum[key] += fillerParsed[key].length
          } else {
            accum[key] = fillerParsed[key].length
          }
        }
      })
      return accum
    }, {})
    let sortByCount = (a, b) => {
      return b[1] - a[1]
    }
    totalFillerCount = Object.entries(totalFillerCount)
    totalFillerCount.sort(sortByCount)
    if (totalFillerCount.length > 5) {
      totalFillerCount = totalFillerCount.slice(0, 5)
      console.log(totalFillerCount.length)
    }
    return (
      <Paper className="dashboard-item" elevation={4}>
        <Paper elevation={2}>
          <Typography variant="h5">Filler Word Ratios</Typography>
          <hr />
          <Typography variant="body1" component="div">
            On average {percentFiller}% of your words for your last{' '}
            {this.speeches.length} speeches were filler words!
            <ol>
              Top fillers
              {totalFillerCount.map((entry, index) => (
                <li key={index}>
                  {entry[0]}: count:{entry[1]}
                </li>
              ))}
            </ol>
          </Typography>
        </Paper>
        <div ref="dashFiller" />
      </Paper>
    )
  }
}

export default DashboardFillerWrapper
