import * as actionTypes from '../constants';
const initialState = {
  users: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    default:
      return state;
  }
};
