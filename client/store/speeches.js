import axios from 'axios'
import history from '../history'

//action types
let POSTED_SPEECH = 'POSTED_SPEECH'
let GOT_SPEECHES = 'GOT_SPEECHES'

//initial state
const initialState = []

//action creators
const postedSpeech = speech => ({type: POSTED_SPEECH, speech})
const gotSpeeches = speeches => ({type: GOT_SPEECHES, speeches})

//thunk creators
export const postSpeech = (transcript, length, userId) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${userId}/speeches/`, {
      transcript,
      length
    })
    dispatch(postedSpeech(res.data))
    history.push(`/user/speeches/${res.data.id}/overview`)
  } catch (err) {
    console.error(err)
  }
}

export const getSpeeches = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/speeches`)
    dispatch(gotSpeeches(res.data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case POSTED_SPEECH:
      return [...state, action.speech]
    case GOT_SPEECHES:
      return action.speeches
    default:
      return state
  }
}
