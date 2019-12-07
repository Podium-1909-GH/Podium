import axios from 'axios'
import history from '../history'

//action types
const GOT_SPEECH = 'GOT_SPEECH'

//initial state
const initialState = {
  length: 0,
  transcript: '',
  fillerObj: '{}',
  wpm: 0,
  numberFiller: 0,
  sentiment: '{}'
}

//action creators
const gotSpeech = speech => ({type: GOT_SPEECH, speech})

//thunk creators
export const getSpeech = (userId, speechId) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/speeches/${speechId}`)
    if (res.data.id === 0) {
      history.push('/notFound')
    } else {
      dispatch(gotSpeech(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_SPEECH:
      return action.speech
    default:
      return state
  }
}
