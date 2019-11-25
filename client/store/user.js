import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const CREATE_USER = 'CREATE_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const createUser = newUser => ({type: CREATE_USER, newUser})
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/login`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/user')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const createdUser = newUser => {
  let res
  return async dispatch => {
    try {
      res = await axios.post('/auth/signup', newUser)
      dispatch(createUser(res.data))
    } catch (err) {
      console.log('User was not created. See: ', err)
    }
    try {
      dispatch(getUser(res.data))
      history.push('/user')
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr)
    }
  }
}

export const updatedUser = (userId, user) => async dispatch => {
  console.log('userId in thunk', userId)
  console.log('user in thunk', user)
  let res
  try {
    res = await axios.put(`/api/users/${userId}`, user)
    console.log('Res.data from axios', res.data)
    return dispatch(updateUser(res.data))
  } catch (error) {
    console.log('Profile update failed.')
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...action.user}
    case REMOVE_USER:
      return defaultUser
    case CREATE_USER:
      return {...action.newUser}
    case UPDATE_USER:
      return {...action.user}
    default:
      return state
  }
}
