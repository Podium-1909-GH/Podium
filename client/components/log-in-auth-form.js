import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../store'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const LogIn = props => {
  const {name, handleSubmit, error} = props
  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        <div>
          <TextField
            required
            id="standard-password-required"
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
            Log In
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

const mapLogin = state => {
  return {
    name: 'login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(login(email, password))
    }
  }
}

export default connect(mapLogin, mapDispatch)(LogIn)

/** PROP TYPES */
LogIn.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
