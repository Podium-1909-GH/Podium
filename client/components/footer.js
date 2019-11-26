import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer-container">
      <div id="footer-details">
        <div className="footer-link-details">
          <Link to="/aboutus">ABOUT US</Link>
        </div>

        <div className="footer-link-details">
          <Link>FEEDBACK</Link>
        </div>

        <div className="footer-link-details">
          <Link>CONTACT</Link>
        </div>

        <div className="footer-link-details">
          <Link>BLOG</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
