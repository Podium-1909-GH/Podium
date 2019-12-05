import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
const Navbar = ({handleClick, isLoggedIn, firstName}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleDropdown = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar position="fixed" id="nav-outer-container">
      <ToolBar id="navbar">
        <h1 id="navWelcome">
          <Link to="/">Podium</Link>
        </h1>

        <nav className="nav-container">
          {isLoggedIn ? (
            <div className="navLinks">
              <Link to="/record">Record</Link>
              <Link to="/user/dashboard">Dashboard</Link>
              <div>
                <a
                  aria-controls="nav-menu"
                  aria-haspopup="true"
                  onClick={handleDropdown}
                >
                  {`Hello, ${firstName}`}
                </a>
                <Menu
                  id="nav-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className="nav-menu-links"
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/user/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <a onClick={handleClick}>Logout</a>
                  </MenuItem>
                </Menu>
              </div>
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
}

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
