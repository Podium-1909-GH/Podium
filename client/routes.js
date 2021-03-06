import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  LogIn,
  SignUp,
  RecordingScreen,
  SpeechOverview,
  UserProfile,
  UserProfileEdit,
  UserDashboard,
  Home,
  ErrorPage
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route path="/record" component={RecordingScreen} />
            <Route
              path="/user/speeches/:speechId/overview"
              component={SpeechOverview}
            />
            <Route exact path="/user/profile" component={UserProfile} />
            <Route
              exact
              path="/user/profile/edit"
              component={UserProfileEdit}
            />
            <Route path="/user/dashboard" component={UserDashboard} />
            <Route component={ErrorPage} />
          </Switch>
        )}
        {/* Displays our 404 Page as a fallback */}

        <Route component={ErrorPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isSignUp: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
