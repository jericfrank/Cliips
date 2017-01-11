import axios from "axios"
import _ from "lodash"

export function retriveUploads(increment) {

  	return function(dispatch) {

      	return axios.get(`/api/upload/${increment}`).then(
				(res) => {

					dispatch({type: "RETRIVE_UPLOADS", payload: res.data.result})
				},
				(err ) => {
					dispatch({type: "ERROR_UPLOADS", payload: err.response.data})
				}
			)
      	
  	}
}

export function fetchUploads(increment) {

  	return function(dispatch) {

      	return axios.get(`/api/upload/${increment}`).then(
				(res) => {
					if(_.isEmpty(res.data.result)) {
						dispatch({type: "EMPTY_UPLOADS"})
					}else{
						dispatch({type: "FETCH_UPLOADS", payload: res.data.result})
					}
				},
				(err ) => {
					dispatch({type: "ERROR_UPLOADS", payload: err.response.data})
				}
			)
      	
  	}
}