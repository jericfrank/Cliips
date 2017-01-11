export default function reducer(state={
    data: [],
    fetching: false,
    fetched: false,
    empty: false,
    errors: {},
  }, action) {

    switch (action.type) {
      
      case "FETCH_LATEST": {
        
        return {
          ...state,
          data: [...state.data, ...action.payload],
          fetching: false,
          fetched: true,
          errors: {},
        }
      }

      case "EMPTY_LATEST": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          empty: true,
          errors: {},
        }
      }


    }

    return state
}
