import axios from "axios"
import _ from "lodash"

export function fetchLatest(increment) {

  	return function(dispatch) {

      	return axios.get(`/api/latest/${increment}`).then(
				(res) => {
					if(_.isEmpty(res.data.result)) {
						dispatch({type: "EMPTY_LATEST"})
					}else{
						dispatch({type: "FETCH_LATEST", payload: res.data.result})
					}

				},
				(err ) => {
					
				}
			)
      	
  	}
}