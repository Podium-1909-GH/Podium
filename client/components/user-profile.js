import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updatedUser} from '../store'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const firstName = evt.target.firstName.value
    const lastName = evt.target.lastName.value
    const email = evt.target.email.value
    const password = evt.target.password.value
    const user = {firstName, lastName, email, password}
    const userId = this.props.user.id
    console.log('userId in mapdispatch', userId)
    this.props.updatedUser(userId, user)
  }

  render() {
    return (
      <div>
        <div>
          <h1>Edit your profile</h1>
        </div>
        <div>
          <form
            className="auth-form"
            onSubmit={this.handleSubmit}
            name={this.props.name}
          >
            <div>
              <TextField
                required
                id="standard-required"
                label="First name"
                name="firstName"
                margin="normal"
              />
            </div>

            <div>
              <TextField
                required
                id="standard-required"
                label="Last name"
                name="lastName"
                margin="normal"
              />
            </div>

            <div>
              <TextField
                required
                id="standard-required"
                label="Email"
                name="email"
                type="email"
                margin="normal"
              />
            </div>

            <div>
              <TextField
                id="standard-password-input"
                label="Password"
                name="password"
                type="password"
                margin="normal"
              />
            </div>

            <div className="button">
              <Button variant="contained" color="primary" type="submit">
                {' '}
                Save Changes
              </Button>
            </div>
            {this.props.error &&
              this.props.error.response && (
                <div> {this.props.error.response.data} </div>
              )}
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    name: 'update profile',
    user: state.user,
    error: state.user.error
  }
}

const mapDispatch = dispatch => ({
  updatedUser: (userId, user) => dispatch(updatedUser(userId, user))
})

export default connect(mapState, mapDispatch)(UserProfile)

/** PROP TYPES */
UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
