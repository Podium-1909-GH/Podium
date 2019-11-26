import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {getSpeeches} from '../store/speeches'
import DashboardWpmWrapper from './dashboard-wpm-wrapper'

class UserDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostRecentSpeeches: []
    }
  }
  async componentDidMount() {
    await this.props.getSpeeches(this.props.userId)
    let speechMap = this.props.speeches.map((speech, index) => {
      speech.index = index + 1
      return speech
    })
    if (speechMap.length > 10) {
      let mostRecent10 = speechMap.slice(speechMap.length - 10)
      this.setState({mostRecentSpeeches: mostRecent10})
    } else {
      this.setState({mostRecentSpeeches: speechMap})
    }
  }
  render() {
    return (
      <div className="data-overview">
        <h2>Dashboard</h2>
        {this.state.mostRecentSpeeches.length === 0 ? (
          <h4>
            Hmm... it doesn't look like you have any speeches. Click{' '}
            <Link to="/record">Here</Link> to get started!
          </h4>
        ) : (
          <React.Fragment>
            <h4>
              A summary of your last {this.state.mostRecentSpeeches.length}{' '}
              speeches
            </h4>
            <DashboardWpmWrapper speeches={this.state.mostRecentSpeeches} />
          </React.Fragment>
        )}
      </div>
    )
  }
}
const MapStateToProps = state => ({
  speeches: state.speeches,
  userId: state.user.id
})
const MapDispatchToProps = dispatch => ({
  getSpeeches: id => dispatch(getSpeeches(id))
})
export default connect(MapStateToProps, MapDispatchToProps)(UserDashboard)

/**
 * PROP TYPES
 */
UserDashboard.propTypes = {
  userId: PropTypes.number.isRequired
}
