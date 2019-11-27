import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const UserProfile = props => (
  <div>
    <div>
      <h1>Profile Summary</h1>
      <p>First Name: {props.user.firstName}</p>
      <p>Last Name: {props.user.lastName}</p>
      <p>Email: {props.user.email}</p>
    </div>
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.history.push('/user/profile/edit')}
      >
        Edit Profile
      </Button>
    </div>
  </div>
)

const mapState = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(UserProfile))
