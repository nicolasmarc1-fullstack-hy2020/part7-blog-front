import { combineReducers } from "redux"
import blogReducer from './blogReducer'
import notificationReducer from "./notificationReducer"
import loggedUserReducer from "./loggedUserReducer"
// import backlogReducer from "./backlogReducer"
// import securityReducer from "./securityReducer"

export default combineReducers({
  blogs: blogReducer,
  notification : notificationReducer,
  loggedUser: loggedUserReducer
  // project: projectReducer,
  // backlog: backlogReducer,
  // security: securityReducer
})
