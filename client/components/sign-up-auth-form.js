import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createdUser} from '../store'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const SignUp = props => {
  const {name, handleSubmit, error} = props

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
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
            required
            id="standard-password-required"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
        </div>

        <div className="button">
          <Button variant="contained" color="primary" type="submit">
            {' '}
            Sign Up
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>

      <Button
        className="auth-form-google"
        href="/auth/google"
        color="primary"
        variant="outlined"
      >
        <img
          id="g-img"
          src="https://image.flaticon.com/teams/slug/google.jpg"
        />
        Sign in with Google
      </Button>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const newUser = {firstName, lastName, email, password}
      dispatch(createdUser(newUser))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignUp)

/** PROP TYPES */
SignUp.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
