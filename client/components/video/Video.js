import React from "react"
import ReactPlayer from 'react-player'
import axios from "axios"

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export default class Video extends React.Component {
	constructor() {
	    super();
	    this.state = {
	    	filename: '',
	    	description: '',
	    	title: '',
	    	user: {}
	    }

	}
	
	componentDidMount() {
		const { id } = this.props.params

	    axios.get(`/api/video/${id}`).then(
			(res) => {

				this.setState({
					filename: res.data.result.filename,
					description: res.data.result.meta.description,
					title: res.data.result.meta.title,
					user: res.data.user
				})

			},
			(err ) => {
				
			}
		)
	}

	render() {
		

		return	<Card>
				    <CardMedia>
				      <ReactPlayer controls url={`/cdn/video/${this.state.filename}`} playing />
				    </CardMedia>
				     <CardTitle title={this.state.title} subtitle={`by ${this.state.user.name}`} />
					    <CardText>
					      	{this.state.description}
					    </CardText>
				</Card>
	}
}