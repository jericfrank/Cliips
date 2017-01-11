export default function reducer(state={
    data: [],
    auth: false,
    errors: {},
  }, action) {

    switch (action.type) {

      case "SET_AUTH": {
        return {
          ...state,
          auth: true,
          data: action.payload,
          errors: {},
        }
      }

      case "UNSET_AUTH": {
        return {
          ...state,
          auth: false,
          data: [],
          errors: {},
        }
      }
      

    }

    return state
}
