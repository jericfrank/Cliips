import React from "react"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import _ from "lodash"
import axios from "axios"

import setAuthToken from '../../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

import validateInput from '../../../lib/validations/login'

import {orange500, blue500} from 'material-ui/styles/colors'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
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
}

@connect()

export default class Login extends React.Component {
	constructor(props) {
	    super(props)

	    this.state = {
	    	name: '',
	    	password: '',
	    	errors: {}
	    }

	    this.handleChange = this.handleChange.bind(this)
	    this.onClick = this.onClick.bind(this)
	}
	
	componentDidMount() {
	}

	handleChange(e) {
    	this.setState({ [e.target.name]: e.target.value })
  	}

  	isValid() {
		const { errors, isValid } = validateInput( this.state )

		if(!isValid) {

			this.setState({errors: errors})
		}

		return isValid
	}

  	onClick(e){


  		if( this.isValid() ) {

  			axios.post('/api/auth/login', this.state).then(
					(res) => {
						localStorage.setItem('gunstoken',  res.data.token);
      					setAuthToken(res.data.token)

      					this.props.dispatch({ type: 'SET_AUTH' , payload: jwtDecode(res.data.token) })
						
						browserHistory.push('/')

					},
					(err ) => {

						this.setState({errors: {name: err.response.data.message, password: err.response.data.message }})
					}
				)
  		}
  	}

	render() {

		return	<Dialog
				title="Login"
				modal={false}
				open={this.props.open}
				onRequestClose={this.props.handleLoginClick}
			>
			

			<TextField
				id="text-field-controlled"
				fullWidth={true}

				floatingLabelText="Username"
      			floatingLabelStyle={styles.floatingLabelStyle}
      			floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      			name="name"
				value={this.state.name}
				onChange={this.handleChange}
				errorText={this.state.errors.name}
			/>

			<TextField
				id="text-field-controlled"
				fullWidth={true}

				floatingLabelText="Password"
      			floatingLabelStyle={styles.floatingLabelStyle}
      			floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      			name="password"
      			type="password"
				value={this.state.password}
				onChange={this.handleChange}
				errorText={this.state.errors.password}
			/>


			<RaisedButton onClick={this.onClick} label="Login" fullWidth={true} />
		</Dialog>
	}
}

