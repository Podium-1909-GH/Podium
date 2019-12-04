import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import history from '../history'

const UserProfile = props => (
  <div>
    <div className="user-profile-form">
      <h1>Profile Summary</h1>
      <p>First Name: {props.user.firstName}</p>
      <p>Last Name: {props.user.lastName}</p>
      <p>Email: {props.user.email}</p>
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
  </div>
)

const mapState = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(UserProfile))
