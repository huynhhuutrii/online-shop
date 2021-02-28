import * as actionTypes from '../constants';
const initialState = {
  homeData: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME_DATA:
      return {
        ...state,
        homeData: action.payload,
      };

    default:
      return state;
  }
};
