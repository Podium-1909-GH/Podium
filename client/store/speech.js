import axios from 'axios'
import history from '../history'

//action types
let POSTED_SPEECH = 'POSTED_SPEECH'

//initial state
const initialState = []

//action creators
const postedSpeech = speech => ({type: POSTED_SPEECH, speech})

//thunk creators
export const postSpeech = (transcript, length, userId) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${userId}/speeches/`, {
      transcript,
      length
    })
    dispatch(postedSpeech(res.data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case POSTED_SPEECH:
      return [...state, action.speech]
    default:
      return state
  }
}
