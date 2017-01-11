import React from "react"


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

export default class Header extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {

 		return	<Card>
					    <CardMedia
					      overlay={<CardTitle title="Welcome !" subtitle="let me watch your 15 seconds video!" />}
					    >
					      <img src="/flatdesign.jpg" />
					    </CardMedia>
					</Card>
	}
}
