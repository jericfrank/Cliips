import React from "react"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import axios from "axios"
import jwtDecode from 'jwt-decode'

import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'

import {List, ListItem} from 'material-ui/List'

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload'
import ActionHome from 'material-ui/svg-icons/action/home';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Search from 'material-ui/svg-icons/action/search'
import Camera from 'material-ui/svg-icons/image/add-a-photo'

import setAuthToken from '../../utils/setAuthToken'


const styles = {
  floatingbutton: {
  	margin: '0px',
    top: '10px',
    right: '20px',
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
    zIndex: '1000'
  },
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

@connect((store) => {
	return {
    	auth: store.auth,
  	}
})


export default class LoggedBar extends React.Component {
	constructor() {
	    super()

	    this.state = {
	    	open: false,
	    	onUploadImage: false,
	    	progress: 0
	    }

	    this.handleClick = this.handleClick.bind(this)
	    this.handleRoute = this.handleRoute.bind(this)
	    this.handleLogoutClick = this.handleLogoutClick.bind(this)
	    
	    this.onChange = this.onChange.bind(this)
	}
	
	componentDidMount() {

	}

	handleClick() {
		this.setState({ open: !this.state.open })
	}

	handleRoute(route){

		browserHistory.push( route )
		this.setState({open: false})
	}

	handleLogoutClick() {
		this.setState({open: false})
	
		localStorage.removeItem('gunstoken');
    	setAuthToken(false);
    	this.props.dispatch({ type: 'UNSET_AUTH' , payload: {} })
    	browserHistory.push('/')
	}

	onChange(e){

		if (e.currentTarget.files && e.currentTarget.files[0]) {
			var file = e.currentTarget.files[0]

			var data = new FormData()
	          		data.append('image', file)
				          		
          	var config = {
            	onUploadProgress: (progressEvent) => {
              		var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
              		this.setState({ progress: percentCompleted })
            	}
          	}

          	axios.post('/api/profile', data, config )
            	.then( (res) => {

            		localStorage.setItem('gunstoken',  res.data.token);
      				setAuthToken(res.data.token)

      				this.props.dispatch({ type: 'SET_AUTH' , payload: jwtDecode(res.data.token) })
            		this.setState({ onUploadImage: false , progress: 0})
            	})
            	.catch( (err) => {
            		console.log(err )
            		
            	})
		}

		
	}

	render() {
		const { auth } = this.props

		const Logged = <IconMenu
			iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		>
		    <MenuItem onClick={this.handleLogoutClick} primaryText="Sign out" />
		</IconMenu>

		return <div>
			<AppBar
				title="Clips"
				onLeftIconButtonTouchTap={this.handleClick}
				iconElementRight={Logged}
			/>
			<Drawer docked={false} width={250} open={this.state.open} onRequestChange={this.handleClick} >
				<Card>
				    <CardMedia>
				    	<img src={`/cdn/image/${auth.data.img}`} />
				    </CardMedia>
				    <CardTitle title={auth.data.username} subtitle="" />
				    <FloatingActionButton disabled={this.state.onUploadImage} secondary={true} mini={true} style={styles.floatingbutton}>
						<Camera />
						<input type="file" onChange={this.onChange} disabled={this.state.onUploadImage} style={styles.imageInput} accept="image/*"/>
					</FloatingActionButton>
				</Card>
 	 			<List>
					<ListItem onTouchTap={this.handleRoute.bind(this , '/')} primaryText="Home" leftIcon={<ActionHome />} />
					<ListItem onTouchTap={this.handleRoute.bind(this , '/uploads')} primaryText="Uploads" leftIcon={<CloudUpload />} />
					<ListItem onTouchTap={this.handleLogoutClick} primaryText="Logout" leftIcon={<ContentInbox />} />
				</List>
			</Drawer>
		</div>
	}
}