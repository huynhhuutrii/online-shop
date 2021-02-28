import * as actionTypes from "../constants";
const initialState = {
  categories: [],
  loading: false,
  error: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORY_RQ:
      return { ...state, loading: true }
    case actionTypes.GET_ALL_CATEGORY_SUCCESS:

      return {
        ...state,
        categories: action.payloads.categories,
        loading: false,
      }
    case actionTypes.GET_ALL_CATEGORY_FAILURE:
      return { ...state, error: action.payloads.error }
    default: return state
  }
}