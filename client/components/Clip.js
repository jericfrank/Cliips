import React from "react"
import { Link , browserHistory } from "react-router"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Clip extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {


		return	<MuiThemeProvider>
					<div>
						<AppBar
				          	title="Clips"
				          	onLeftIconButtonTouchTap={browserHistory.goBack} 
				          	iconElementLeft={<IconButton><NavigationClose /></IconButton>}
				        />
				        { this.props.children }
					</div>

				</MuiThemeProvider>
	}
}