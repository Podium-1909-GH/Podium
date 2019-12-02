import React from 'react'
import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img
        className="error-img"
        src="https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=1200&name=shutterstock_774749455.jpg"
      />
      <div>
        <h2>
          Sorry, but we couldn't find that page.
          <p>Please try another request.</p>
          <Link to="/">
            <button type="button">Go Back Home</button>
          </Link>
        </h2>
      </div>
    </div>
  )
}
export default ErrorPage
