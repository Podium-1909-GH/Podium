import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'

const WelcomePage = props => {
  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RecordVoiceOverIcon />}
          onClick={() => props.history.push('/record')}
        >
          Record
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => props.history.push('/user/dashboard')}
        >
          Check out your dashboard
        </Button>
      </div>
    </div>
  )
}

/** CONTAINER */
const mapState = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(WelcomePage))
