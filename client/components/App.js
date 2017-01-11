import React from "react"
import { connect } from "react-redux"

import LoggedBar from './layouts/LoggedBar'
import AuthBar from './layouts/AuthBar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


@connect((store) => {
	return {
    	auth: store.auth,
  	}
})


export default class App extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { auth } = this.props

 		return	<MuiThemeProvider>
				<div>
					{ (auth.auth) ? <LoggedBar /> : <AuthBar /> }
					
			        { this.props.children }

				</div>
	  	</MuiThemeProvider>
	}
}