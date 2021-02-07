// actionTypes
export const notificationActions = {
  NOTIFICATION_ON: 'NOTIFICATION_ON',
  NOTIFICATION_OFF: 'NOTIFICATION_OFF'
}

// reducer
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case notificationActions.NOTIFICATION_ON:
      return action.data
    case notificationActions.NOTIFICATION_OFF:
      return null
    default:
      return state
  }
}
export default notificationReducer


// Action Creators
const time = 5
export const setNotification = ({text, type}) => {

  return async (dispatch, getState) => {

    if (getState().notification && getState().notification.timeoutId) {
      const timeoutId = getState().notification.timeoutId
      clearTimeout(timeoutId)
    }

    const timeout = setTimeout(() => {
      dispatch({
        type: notificationActions.NOTIFICATION_OFF
      })
    }, time * 1000)

    dispatch({
      type: notificationActions.NOTIFICATION_ON,
      data: {
        text,
        type,
        timeoutId: timeout
      }
    })
  }
}
