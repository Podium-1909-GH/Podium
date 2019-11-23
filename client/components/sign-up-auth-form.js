import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createdUser} from '../store'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const SignUp = props => {
  const {name, handleSubmit, error} = props

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        <div>
          <TextField
            required
            id="standard-required"
            label="First name"
            margin="normal"
          />
        </div>

        <div>
          <TextField
            required
            id="standard-required"
            label="Last name"
            margin="normal"
          />
        </div>

        <div>
          <TextField
            required
            id="standard-required"
            label="Email"
            margin="normal"
          />
        </div>

        <div>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
        </div>

        <div>
          <Button variant="contained" color="primary" type="submit">
            {' '}
            Sign Up
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
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
