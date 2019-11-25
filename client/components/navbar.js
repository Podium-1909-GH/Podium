import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, firstName}) => (
  <div>
    <h1 id="navWelcome">
      <Link to="/">Podium</Link>
    </h1>

    <nav className="nav-container">
      {isLoggedIn ? (
        <div>
          <Link to="/user">
            <h4>{`Hello, ${firstName}`}</h4>
          </Link>
          <a onClick={handleClick}>Logout</a>
        </div>
      ) : (
        <div>
          <Link to="/login">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
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
