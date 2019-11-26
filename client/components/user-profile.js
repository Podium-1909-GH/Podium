import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updatedUser} from '../store'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // const firstName = evt.target.firstName.value
    // const lastName = evt.target.lastName.value
    // const email = evt.target.email.value
    // const password = evt.target.password.value
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    const userId = this.props.user.id
    this.props.updatedUser(userId, user)
    this.setState({})
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
                label={this.props.user.firstName}
                name="firstName"
                margin="normal"
                helperText="First Name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>

            <div>
              <TextField
                required
                id="standard-required"
                label={this.props.user.lastName}
                name="lastName"
                margin="normal"
                helperText="Last Name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>

            <div>
              <TextField
                required
                id="standard-required"
                label={this.props.user.email}
                name="email"
                type="email"
                margin="normal"
                helperText="Email"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>

            <div>
              <TextField
                required
                id="standard-password-input"
                label={this.props.user.password}
                name="password"
                type="password"
                margin="normal"
                helperText="Password"
                onChange={this.handleChange}
                value={this.state.name}
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
  error: PropTypes.object
}
