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
    window.scrollTo(0, 0)
    const userId = this.props.userId
    const speechId = this.props.match.params.speechId
    this.props.getSpeech(userId, speechId)
  }
  render() {
    let fillerObj
    let sentiment
    if (this.props.speech.id !== 0) {
      fillerObj = JSON.parse(this.props.speech.fillerObj)
      sentiment = JSON.parse(this.props.speech.sentiment)
    }
    return (
      <div className="data-overview">
        {this.props.speech.id === 0 ? (
          <Typography>Speech Not Found</Typography>
        ) : (
          <React.Fragment>
            <div>
              <Typography
                variant="h3"
                style={{fontFamily: 'Merriweather', fontWeight: '600'}}
              >
                Speech Summary <hr />
              </Typography>
              <SpeechTranscript transcript={this.props.speech.transcript} />
            </div>
            <br />
            <div>
              <D3BubblesWrapper speech={this.props.speech} />
              <SpeechFillerWrapper
                fillerObj={fillerObj}
                speech={this.props.speech}
              />
              <SpeechSentimentWrapper sentiment={sentiment} />
              <SpeechWPMWrapper speech={this.props.speech} />
            </div>
          </React.Fragment>
        )}
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
