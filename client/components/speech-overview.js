import React from 'react'
import {connect} from 'react-redux'
import {getSpeech} from '../store/speech'
import D3BubblesWrapper from './overview-info-bubbles-wrapper'
import SpeechSentimentWrapper from './speech-sentiment-wrapper'
import SpeechFillerWrapper from './speech-filler-wrapper'
import SpeechWPMWrapper from './speech-wpm-wrapper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import SpeechTranscript from './speech-transcript'

class SpeechOverview extends React.Component {
  //speech model: id, length, transcript, fillerObj, wpm, numberFiller, sentiment
  componentDidMount() {
    const userId = this.props.userId
    const speechId = this.props.match.params.speechId
    this.props.getSpeech(userId, speechId)
  }
  render() {
    let fillerObj = JSON.parse(this.props.speech.fillerObj)
    let sentiment = JSON.parse(this.props.speech.sentiment)

    return (
      <div className="data-overview">
        <div>
          <Typography
            variant="h3"
            style={{fontFamily: 'Merriweather', fontWeight: '600'}}
          >
            Speech Summary
          </Typography>
          <SpeechTranscript transcript={this.props.speech.transcript} />
        </div>
        <br />
        <div>
          <D3BubblesWrapper speech={this.props.speech} />
          {Object.entries(sentiment).length !== 0 && (
            <SpeechSentimentWrapper sentiment={sentiment} />
          )}
          <SpeechFillerWrapper
            fillerObj={fillerObj}
            speech={this.props.speech}
          />
          <SpeechWPMWrapper speech={this.props.speech} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  speech: state.speech,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getSpeech: (userId, speechId) => dispatch(getSpeech(userId, speechId))
})

/** PROP TYPES */
SpeechOverview.propTypes = {
  speech: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeechOverview)
