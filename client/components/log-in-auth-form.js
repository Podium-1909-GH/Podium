import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../store'
import Button from '@material-ui/core/Button'

const LogIn = props => {
  const {name, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Log In
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Log In with Google</a>
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
