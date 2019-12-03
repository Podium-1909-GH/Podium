import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import history from '../history'
import DashboardMainWrapper from './dashboard-main-wrapper'
import Typography from '@material-ui/core/Typography'
import {getSpeeches} from '../store/speeches'
import PropTypes from 'prop-types'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speeches: []
    }
  }

  async componentDidMount() {
    await this.props.getSpeeches(this.props.userId)
  }

  render() {
    console.log('SPEECHES', this.state.speeches)
    return (
      <div className="dashboard-overview">
        <Typography variant="h3">Profile Summary</Typography>
        {this.props.speeches.length === 0 ? (
          <Typography variant="h5">
            Hmm... it doesn't look like you have any speeches. Click{' '}
            <Link to="/record">Here</Link> to get started!
          </Typography>
        ) : (
          <React.Fragment>
            <br />
            <Typography variant="h5">All of your speeches by length</Typography>
            <DashboardMainWrapper />
            <br />
            <div className="user-profile-form">
              {/* <h1>Profile Summary</h1> */}
              <p>First Name: {this.props.user.firstName}</p>
              <p>Last Name: {this.props.user.lastName}</p>
              <p>Email: {this.props.user.email}</p>
            </div>
            <div className="user-profile-form">
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/user/profile/edit')}
              >
                Edit
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    speeches: state.speeches,
    userId: state.user.id
  }
}

const MapDispatchToProps = dispatch => ({
  getSpeeches: id => dispatch(getSpeeches(id))
})

export default connect(mapState, MapDispatchToProps)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  userId: PropTypes.number.isRequired
}
