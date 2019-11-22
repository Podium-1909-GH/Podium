import React from 'react'
import {connect} from 'react-redux'
import {getSpeech} from '../store/speech'

class SpeechOverview extends React.Component {
  //speech model: id, length, transcript, fillerObj, wpm, numberFiller, sentiment
  componentDidMount() {
    const userId = this.props.userId
    const speechId = this.props.match.params.speechId

    this.props.getSpeech(userId, speechId)
  }

  render() {
    const fillerObj = JSON.parse(this.props.speech.fillerObj)
    const sentiment = JSON.parse(this.props.speech.sentiment)
    return (
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
        {/* <ul>your sentiment
          {Object.keys(sentiment).map(key => {
              return <li key={key}>{key}: {sentiment[key]}</li>
          })}
        </ul> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpeechOverview)
