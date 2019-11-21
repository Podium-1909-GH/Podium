import React from 'react'
import Button from '@material-ui/core/Button'

const WelcomePage = () => {
  return (
    <div>
      <div>
        <h1>Welcome name!</h1>
      </div>
      <div>
        <Button variant="contained" color="primary">
          Record
        </Button>
        <Button variant="contained" color="primary">
          Check out your dashboard
        </Button>
      </div>
    </div>
  )
}
export default WelcomePage
