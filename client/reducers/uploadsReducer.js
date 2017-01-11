export default function reducer(state={
    data: [],
    fetching: false,
    fetched: false,
    empty: false,
    errors: {},
  }, action) {

    switch (action.type) {

      case "RETRIVE_UPLOADS": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
          errors: {},
        }
      }

      case "EMPTY_UPLOADS": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          empty: true,
          errors: {},
        }
      }

      case "FETCH_UPLOADS": {
        
        return {
          ...state,
          data: [...state.data, ...action.payload],
          fetching: false,
          fetched: true,
          errors: {},
        }
      }

      case "ADD_UPLOADS": {
        
        return {
          ...state,
          data: [action.payload, ...state.data],
          fetching: false,
          fetched: true,
          errors: {},
        }
      }


      case "ERROR_UPLOADS": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          errors: action.payload,
        }
      }

    }

    return state
}
