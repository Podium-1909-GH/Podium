import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer-container">
      <div>
        <h2 href="#pablo">Podium</h2>
      </div>

      <ul>
        <Link href="#pablo">About Us</Link>
      </ul>

      <ul>
        <Link href="#pablo">Support</Link>
      </ul>
    </footer>
  )
}
export default Footer
