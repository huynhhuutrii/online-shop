import * as actionTypes from '../constants';
const initialState = {
  token: null,
  user: {
    username: 'tri',
    email: '',
  },

  authenticate: false,
  authenticating: false,
  loading: false,
  message: '',
  error: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, authenticating: true };
    case actionTypes.LOGIN_SUCCESS:
      const { token, user } = action.payload;
      return {
        ...state,
        token: token,
        user: user,
        authenticate: true,
        authenticating: false,
      };
    case actionTypes.LOGIN_FAILUER:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState,
        loading: false,
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case actionTypes.REGISTER_REQUEST:
      return { ...state, areRegitering: true };

    case actionTypes.REGISTER_SUCCESS:
      const newUser = JSON.parse(localStorage.getItem('user'));
      const { message } = action.payload;
      return {
        ...state,
        message: message,
        loading: false,
        authenticate: true,
        user: newUser,
      };
    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
