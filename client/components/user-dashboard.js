/* eslint-disable react/no-unused-state */
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {getSpeeches} from '../store/speeches'
import DashboardWpmWrapper from './dashboard-wpm-wrapper'
import DashboardFillerWrapper from './dashboard-filler-wrapper'
import DashboardInfoBubblesWrapper from './dashboard-info-bubbles-wrapper'
import DashboardMainWrapper from './dashboard-main-wrapper'
import DashboardSentimentWrapper from './dashboard-sentiment-wrapper'
import Typography from '@material-ui/core/Typography'

class UserDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostRecentSpeeches: [],
      speeches: []
    }
  }
  async componentDidMount() {
    await this.props.getSpeeches(this.props.userId) // Speeches sorted by date ASC in back-end
    let speechMap = this.props.speeches.map((speech, index) => {
      // Add index to keep track of nth speech for a given user
      speech.index = index + 1
      return speech
    })

    if (speechMap.length > 10) {
      let mostRecent10 = speechMap.slice(speechMap.length - 10) // Only get most recent 10 speeches
      this.setState({mostRecentSpeeches: mostRecent10})
      this.setState({speeches: speechMap})
    } else {
      this.setState({mostRecentSpeeches: speechMap})
    }
  }

  render() {
    return (
      <div className="data-overview">
        <Typography
          variant="h3"
          style={{fontFamily: 'Merriweather', fontWeight: '600'}}
        >
          {this.props.userName}'s Dashboard <hr />
        </Typography>
        {this.state.mostRecentSpeeches.length === 0 ? (
          <Typography variant="h5">
            Hmm... it doesn't look like you have any speeches. Click{' '}
            <Link to="/record">Here</Link> to get started!
          </Typography>
        ) : (
          <React.Fragment>
            {/* <Typography variant="h5">All of your speechesby</Typography> */}

            {/* <hr /> */}
            <Typography variant="h5">
              Summary of your last {this.state.mostRecentSpeeches.length}{' '}
              speeches
            </Typography>
            <DashboardInfoBubblesWrapper
              speeches={this.state.mostRecentSpeeches}
            />
            <DashboardFillerWrapper speeches={this.state.mostRecentSpeeches} />
            <DashboardSentimentWrapper
              speeches={this.state.mostRecentSpeeches}
            />
            <DashboardWpmWrapper speeches={this.state.mostRecentSpeeches} />
            <br />
            <Typography variant="h5">Your speech history</Typography>
            <DashboardMainWrapper />
          </React.Fragment>
        )}
      </div>
    )
  }
}
const MapStateToProps = state => ({
  speeches: state.speeches,
  userId: state.user.id,
  userName: state.user.firstName
})
const MapDispatchToProps = dispatch => ({
  getSpeeches: id => dispatch(getSpeeches(id))
})
export default connect(MapStateToProps, MapDispatchToProps)(UserDashboard)

/**
 * PROP TYPES
 */
UserDashboard.propTypes = {
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired
}
