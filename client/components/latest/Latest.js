import React from "react"
import { connect } from "react-redux"
import { Link , browserHistory } from "react-router"

import Header from '../layouts/Header'

import SingleLatest from "./SingleLatest"
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Subheader from 'material-ui/Subheader'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CircularProgress from 'material-ui/CircularProgress'
import Search from 'material-ui/svg-icons/action/search'

import { fetchLatest } from "../../actions/latestActions"

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
  }
};

@connect((store) => {
	return {
    	latest: store.latest,
  	}
})

export default class Latest extends React.Component {
	constructor() {
	    super()
	    
	   	this.state = {
	    	progress: 0,
	    	increment: 0,
	    	fetching: true
	    }

	    this.handleIncrement = this.handleIncrement.bind(this)
	    this.handleScroll = this.handleScroll.bind(this)
	}
	
	componentDidMount() {
		if(this.props.latest.data.length == 0){
			this.handleIncrement()
		}
		window.addEventListener('scroll', this.handleScroll)
	}

	handleScroll(e) {
		let target = e.target || e.srcElement
	    let scrollTop = target.body.scrollTop

	    if ((window.innerHeight + scrollTop) >= document.body.offsetHeight) {
	        this.handleIncrement()
	    }

	}

	handleIncrement(){

		if(!this.props.latest.empty){
			if(this.state.fetching){
				this.setState({ fetching: false })
				
				this.props.dispatch(fetchLatest( this.state.increment )).then(
					(res) => {
						this.setState({ fetching: true , increment: this.state.increment + 1 })
					},
					(err) => {
						console.log('err: ', err)

					}
				)
			}
		}

	}

	render() {

		const { latest } = this.props

		const data = latest.data.map(latests =>
			<SingleLatest key={latests._id} latest={latests} />
	    )

		return  <div style={styles.root}>


					<Header />
					<GridList
				      cols={2}
				      cellHeight={200}
				      padding={1}
				      style={styles.gridList}
				    >
				    	<Subheader>Latest Videos</Subheader>
				    	
				    	{data}


				    </GridList>
				    { (latest.empty) ? <p>end of records</p> : '' }
				    
				</div>
	}
}