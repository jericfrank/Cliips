import { combineReducers } from "redux"

import auth from "./authReducer"
import uploads from "./uploadsReducer"
import latest from "./latestReducer"

export default combineReducers({
  	uploads,
  	auth,
  	latest
})
