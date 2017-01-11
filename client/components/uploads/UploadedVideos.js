import React from "react"
import { Link , browserHistory } from "react-router"
import axios from "axios"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from "react-redux"
import _ from "lodash"
import { fetchUploads } from "../../actions/uploadsActions"

import CircularProgress from 'material-ui/CircularProgress'
import Subheader from 'material-ui/Subheader'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    overflowY: 'auto',
  },
};

@connect((store) => {
	return {
		auth: store.auth,
    	uploads: store.uploads,
  	}
})

export default class UploadedVideos extends React.Component {
	constructor(props) {
	    super(props)
	    
	    this.state = {
	    	progress: 0,
	    	increment: 0,
	    	fetching: true
	    }

	    this.handleIncrement = this.handleIncrement.bind(this)
	    this.handleScroll = this.handleScroll.bind(this)
	    

	}
	
	componentDidMount() {
		if(this.props.uploads.data.length == 0){
			this.handleIncrement()
		}
		window.addEventListener('scroll', this.handleScroll)
		
	}

	componentWillUnmount() {

	}


	handleScroll(e) {
		let target = e.target || e.srcElement
	    let scrollTop = target.body.scrollTop

	    if ((window.innerHeight + scrollTop) >= document.body.offsetHeight) {
	        this.handleIncrement()
	    }

	}


	handleIncrement(){

		if(!this.props.uploads.empty)
			if(this.state.fetching){
				this.setState({ fetching: false })
				this.props.dispatch(fetchUploads( this.state.increment )).then(
					(res) => {
						this.setState({ fetching: true , increment: this.state.increment + 1 })
					},
					(err) => {
						console.log('err: ', err)

					}
				)
			}


	}



	render() {
		const { uploads , auth } = this.props

		const data = uploads.data.map(upload =>
			<GridTile
				key={upload._id}
				containerElement={<Link to={`/${upload._id}`}/>}
		        title={upload.meta.title + ' ' + upload.createdAt}
		        subtitle={<span>by <b>{auth.data.username}</b></span>}
		        actionIcon={<IconButton><PlayArrow color="white" /></IconButton>}
		    >
		        <img src={`/cdn/thumb/${upload.thumbs}`} />
		    </GridTile>
	    )

		return <div style={styles.root}>
			<GridList
		      cols={1}
		      cellHeight={200}
		      padding={1}
		      style={styles.gridList}
		    >
		    	<Subheader>My Videos</Subheader>
		    	
		    	{data}
		    </GridList>

		    { (uploads.empty) ? <p>end of records</p> : '' }
		</div>
	}
}