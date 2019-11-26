import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
const Navbar = ({handleClick, isLoggedIn, firstName}) => (
  <AppBar position="static">
    <ToolBar id="navbar">
      <h1 id="navWelcome">
        <Link to="/">Podium</Link>
      </h1>

      <nav className="nav-container">
        {isLoggedIn ? (
          <div className="navLinks">
            <Link to="/user">{`Hello, ${firstName}`}</Link>
            <Link to="/record">Record</Link>
            <Link to="/user/dashboard">Dashboard</Link>
            <Link to="/user/profile">Profile</Link>
            <a onClick={handleClick}>Logout</a>
          </div>
        ) : (
          <div className="navLinks">
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </nav>
    </ToolBar>
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
}
