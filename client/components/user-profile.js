import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import Button from '@material-ui/core/Button'

/**
 * COMPONENT
 */
export const UserProfile = () => {
  return <div />
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  firstName: PropTypes.string
}
