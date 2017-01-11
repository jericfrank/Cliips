import React from "react"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import NotFound from "../components/NotFound"

@connect((store) => {
	return {
    	auth: store.auth,
  	}
})

export default function(ComposedComponent) {
	class RequireAuth extends React.Component {
		constructor() {
		    super()
		}
		
		componentDidMount() {
		}

		render() {
			const { auth } = this.props
			if(!auth.auth) {
				return <NotFound />
			}

			return <ComposedComponent {...this.props} />
		}
	}

	return RequireAuth
}