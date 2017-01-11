import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import setAuthToken from './utils/setAuthToken'
import jwtDecode from 'jwt-decode'

import { Provider } from "react-redux"
import store from "./store"

import routes from './routes'

if(localStorage.gunstoken){

	setAuthToken(localStorage.gunstoken)
	store.dispatch({ type: 'SET_AUTH' , payload: jwtDecode(localStorage.gunstoken) })
}

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
	<Router history={browserHistory} routes={routes} />
</Provider>, app)