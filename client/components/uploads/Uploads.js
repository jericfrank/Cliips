import React from "react"
import ReactPlayer from 'react-player'
import axios from "axios"
import { connect } from "react-redux"
import { Link , browserHistory } from "react-router"
import Validator from 'validator';

import { fetchUploads } from "../../actions/uploadsActions"
import UploadedVideos from "./UploadedVideos"

import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload'

import Subheader from 'material-ui/Subheader'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'

import {orange500, blue500} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'

const styles = {
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
	 gridList: {
	    width: 'auto',
	    height: 'auto',
	    overflowY: 'auto',
	  },

	  	errorStyle: {
		color: orange500,
	},
	underlineStyle: {
		borderColor: orange500,
	},
	floatingLabelStyle: {
		color: orange500,
	},
	floatingLabelFocusStyle: {
		color: blue500,
	},
};

let file = {}
@connect((store) => {
	return {
    	uploads: store.uploads,
  	}
})

export default class Uploads extends React.Component {
	constructor() {
	    super()

	    this.state = {
	    	videoSrc: '',
	    	progress: 0,
	    	onSelectVideo: false,
	    	onUpload: false,

	    	title: '',
	    	description: '',
	    	errors: {}
	    }

	    this.handleSelectVideo = this.handleSelectVideo.bind(this)
	    this.handleCancel = this.handleCancel.bind(this)
	    this.handleUpload = this.handleUpload.bind(this)

	    this.handleKeypress = this.handleKeypress.bind(this)
	}
	
	componentDidMount() {

	}

	isValid(file){
		if (file.type != 'video/mp4' || file.type != 'video/mp4') {   
            return false
        }

        if( file.size > 5000000 ){
        	return false
        }

        return true
	}

	handleCancel(e) {
		this.setState({ videoSrc: '' , onSelectVideo: false })
	}

	handleUpload(e){
		if(this.isValid(file)) {
			if(this.isValidateDetails()){
				var data = new FormData()
	          		data.append('title', this.state.title)
	          		data.append('description', this.state.description)
	          		data.append('video', file)
				          		
	          	var config = {
	            	onUploadProgress: (progressEvent) => {
	              		var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
	              		this.setState({ progress: percentCompleted })
	            	}
	          	}

	          	axios.post('/api/upload', data, config )
	            	.then( (res) => {
	            		this.props.dispatch({type: "ADD_UPLOADS", payload: res.data})
	            		this.setState({ onSelectVideo: false , progress: 0})
	            	})
	            	.catch( (err) => {
	            		console.log(err )
	            		
	            	})

				
			}
		}
	}

	isValidateDetails(){
		if( Validator.isEmpty(this.state.title) ) {
			this.setState({ errors: { title: 'this is required' } })

			return false
		}
		
		if( Validator.isEmpty(this.state.description) ) {
			this.setState({ errors: { description: 'this is required' } })

			return false
		}

		this.setState({ errors: {} })

		return true
	}

	handleSelectVideo(e) {

		if (e.currentTarget.files && e.currentTarget.files[0]) {
			file = e.currentTarget.files[0]
			if(this.isValid(file)) {
				var reader = new FileReader()
				reader.readAsDataURL(file)
	        	reader.onload = (event) => {
	            	var the_url = event.target.result
					this.setState({ videoSrc: the_url , onSelectVideo: true })
				}
			}else{

				alert('File size not available! Upload file no more than 5mb')
			}
		}
	}

	handleKeypress(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {

		const uploadView = <Card>
 				<CardMedia>
    				<ReactPlayer url={this.state.videoSrc} playing controls={true} />
    			</CardMedia>
    			<CardText>

	  				<TextField
						id="text-field-controlled"
						fullWidth={true}
						onChange={this.handleKeypress}
						value={this.state.title}
						floatingLabelText="Title"
		      			floatingLabelStyle={styles.floatingLabelStyle}
		      			floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
		      			name="title"
		      			disabled={this.state.onUpload}
		      			errorText={this.state.errors.title}
					/>

					<TextField
						id="text-field-controlled"
						fullWidth={true}
						onChange={this.handleKeypress}
						value={this.state.description}
						floatingLabelText="Description"
		      			floatingLabelStyle={styles.floatingLabelStyle}
		      			floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
		      			name="description"
		      			disabled={this.state.onUpload}
		      			errorText={this.state.errors.description}
					/>

					<LinearProgress mode="determinate" value={this.state.progress} />
					<RaisedButton disabled={this.state.onUpload} onClick={this.handleUpload} label="Upload" primary={true} fullWidth={true} />
					<RaisedButton disabled={this.state.onUpload} onClick={this.handleCancel} label="Cancel" fullWidth={true} />
	  			</CardText>
			</Card>

		const selectView = <Card>
				<CardActions>
	  				<RaisedButton icon={<CloudUpload/>} fullWidth={true}>
	  					<input type="file" onChange={this.handleSelectVideo} style={styles.imageInput} accept="video/*"/>
	  				</RaisedButton>
	  			</CardActions>
			</Card>

 		return	<div>
 			{ (this.state.onSelectVideo) ? uploadView : selectView }
 			

 			<UploadedVideos />
 		</div>
	}
}