import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

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
          Track your progress
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
    firstName: state.user.firstName
  }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
