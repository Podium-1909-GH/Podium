import React from 'react'

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img
        className="error-img"
        src="https://www.roadrunnerfinancial.com/wp-content/uploads/2019/04/404_error_ill-552x480.png"
      />
      <div>
        <h2>
          Sorry, but we couldn't find that page.
          <p>Please try another request.</p>
        </h2>
      </div>
    </div>
  )
}
export default ErrorPage
