import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer"

// actionTypes
export const loggedUserActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

// reducer
const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
    case loggedUserActions.LOGIN:
      return action.data
    case loggedUserActions.LOGOUT:
      return null
    default:
      return state
  }
}
export default loggedUserReducer


// Action Creators
export const retrieveUser = () => {
  return async (dispatch) => {
    const loggedUserString = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserString) {
      const loggedUser = JSON.parse(loggedUserString)
      dispatch({
        type: loggedUserActions.LOGIN,
        data: loggedUser
      })
      blogService.setToken(loggedUser.token)
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
      try {
        const userToLog = await loginService.login(credentials)
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(userToLog)
        )
        blogService.setToken(userToLog.token)
        dispatch({
          type: loggedUserActions.LOGIN,
          data: userToLog
        })
      } catch (e) {
        dispatch(setNotification({
          text: 'wrong username or password',
          type: 'notification error',
        }))
      }  
  }
}

export const logout = () => {
  return (dispatch) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: loggedUserActions.LOGOUT
    })
  }
}
