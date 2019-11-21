import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

const WelcomePage = props => {
  const firstName = props.user.firstName

  return (
    <div>
      <div>
        <h1>{`Welcome ${firstName}!`}</h1>
      </div>
      <div>
        <Button variant="contained" color="primary">
          Record
        </Button>
        <Button variant="contained" color="primary">
          Check out your dashboard
        </Button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    firstName: state.user.firstName
  }
}

WelcomePage.propTypes = {
  firstName: PropTypes.string
}

export default connect(mapState)(WelcomePage)
