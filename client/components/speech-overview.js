import React from 'react'
import {connect} from 'react-redux'
import {getSpeech} from '../store/speech'
import SpeechFillerWrapper from './speech-filler-wrapper'
import PropTypes from 'prop-types'

class SpeechOverview extends React.Component {
  //speech model: id, length, transcript, fillerObj, wpm, numberFiller, sentiment
  async componentDidMount() {
    const userId = this.props.userId
    const speechId = this.props.match.params.speechId
    this.props.getSpeech(userId, speechId)
  }

  render() {
    let fillerObj = JSON.parse(this.props.speech.fillerObj)
    let sentiment = this.props.speech.sentiment

    return (
      <div>
        <div>
          <h1>Summary</h1>
          <h3>your speech!</h3>
          <p>{this.props.speech.transcript}</p>
          <ul>
            your filler words
            {Object.keys(fillerObj).map(word => {
              if (fillerObj[word].length > 0) {
                return (
                  <li key={word}>
                    {word}: {fillerObj[word].length}
                  </li>
                )
              }
            })}
          </ul>
          <p>{JSON.stringify(sentiment)}</p>
        </div>
        <div>
          <SpeechFillerWrapper fillerObj={fillerObj} />
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
