import React from "react"

import Login from "../auth/Login"
import Register from "../auth/Register"

import AppBar from 'material-ui/AppBar'

import {List, ListItem} from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import ContentInbox from 'material-ui/svg-icons/social/person'
import Lock from 'material-ui/svg-icons/action/lock'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'


export default class AuthBar extends React.Component {
	constructor() {
	    super()

	    this.state = {
	    	loginOpen: false,
	    	registerOpen: false,
	    	drawerOpen: false,
	    }

		this.handleLoginClick = this.handleLoginClick.bind(this)
		this.handleRegisterClick = this.handleRegisterClick.bind(this)
		this.handleDrawerClick = this.handleDrawerClick.bind(this)
	}
	
	componentDidMount() {

	}

	handleLoginClick() {
		this.setState({ loginOpen: !this.state.loginOpen , drawerOpen: false })
	}

	handleRegisterClick() {
		this.setState({ registerOpen: !this.state.registerOpen , drawerOpen: false })
	}

	handleDrawerClick(){
		this.setState({ drawerOpen: !this.state.drawerOpen })
	}

	render() {
		
		const Auth = <IconMenu
			iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		>
			<MenuItem onTouchTap={this.handleRegisterClick} primaryText="Register" />
			<MenuItem onTouchTap={this.handleLoginClick} primaryText="Login" />
		</IconMenu>

		return <div>
			<AppBar
				title="Clips"
				onLeftIconButtonTouchTap={this.handleDrawerClick}
				iconElementRight={Auth}
			/>
			<Login open={this.state.loginOpen} handleLoginClick={this.handleLoginClick}/>
			<Register open={this.state.registerOpen} handleRegisterClick={this.handleRegisterClick}/>

			<Drawer docked={false} width={250} open={this.state.drawerOpen} onRequestChange={this.handleDrawerClick} >
 	 			<List>
					<ListItem onTouchTap={this.handleLoginClick} primaryText="Login" leftIcon={<Lock />} />
					<ListItem onTouchTap={this.handleRegisterClick} primaryText="Register" leftIcon={<ContentInbox />} />
				</List>
			</Drawer>

		</div>
	}
}