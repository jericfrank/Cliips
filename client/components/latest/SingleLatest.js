import React from "react"
import { Link , browserHistory } from "react-router"

import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'


export default class SingleLatest extends React.Component {
	constructor() {
	    super()
	    
	}
	
	componentDidMount() {

	}


	render() {
		const { latest } = this.props
		
		return  <GridTile
					containerElement={<Link to={`/${latest._id}`}/>}
			        title={latest.meta.title}
			        subtitle={<span>{latest.meta.description}</span>}
			        actionIcon={<IconButton><PlayArrow color="white" /></IconButton>}
			    >
			        <img src={`/cdn/thumb/${latest.thumbs}`} />
			    </GridTile>
	}
}