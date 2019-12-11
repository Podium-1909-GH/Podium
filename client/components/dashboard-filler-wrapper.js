/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-string-refs */
import React, {Component} from 'react'
import DashBoardWpmD3 from './dashboard-filler-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class DashboardFillerWrapper extends Component {
  // important to put in component did mount because we're changing something that already loaded to screen
  constructor(props) {
    super(props)
    this.speeches = this.props.speeches
    this.percentFiller = Math.round(
      // Calculate overall percent filler for most recent speeches. Total filler words/ Total words in all transcripts
      100 *
        (this.speeches.reduce(
          (accum, speech) => accum + speech.numberFiller, // sum number of filler words
          0
        ) /
          this.speeches.reduce(
            (accum, speech) => accum + speech.transcript.split(' ').length, // sum total number of words
            0
          ))
    )
    this.totalFillerCount = this.speeches.reduce((accum, speech) => {
      // Array of all filler words used in most recent speeches, and how many times each was used
      let fillerParsed = JSON.parse(speech.fillerObj) // Convert to regular object
      let speechKeys = Object.keys(fillerParsed)
      speechKeys.forEach(key => {
        if (fillerParsed[key].length > 0) {
          // If any incidences of specific filler word in a given speech
          if (accum[key]) {
            // If already tracking that filler word
            accum[key] += fillerParsed[key].length // Add count of filler word for speech to overall count of filler word for all speeches
          } else {
            accum[key] = fillerParsed[key].length // Add that filler word to the object with its count
          }
        }
      })
      return accum
    }, {})
    let sortByCount = (a, b) => {
      // Sort array of filler words in descending order by count/value
      return b[1] - a[1] // [key,value]
    }
    this.totalFillerCount = Object.entries(this.totalFillerCount)
    this.totalFillerCount.sort(sortByCount)
    if (this.totalFillerCount.length > 5) {
      // Get top 5 filler words
      this.totalFillerCount = this.totalFillerCount.slice(0, 5)
    }
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
    return (
      <div className="dashboard-item">
        <Paper className="dashboard-chart" elevation={4}>
          <a name="filler">
            <div ref="dashFiller" />
          </a>
        </Paper>
        <Paper elevation={4}>
          <Typography variant="h5">Filler Word Ratios</Typography>
          <hr />
          <Typography
            variant="body1"
            component="div"
            className="dashboard-item-text"
          >
            On average {this.percentFiller}% of your words for your last{' '}
            {this.speeches.length} speeches were filler words!
            <ol className="dashboard-item-bullets">
              <span>Top fillers</span>
              {this.totalFillerCount.map((entry, index) => (
                <li key={index}>{entry[0]}</li>
              ))}
            </ol>
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default DashboardFillerWrapper
