import * as actionTypes from '../constants';
import axios from '../../helpers';
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    try {
      const res = await axios.post('/login', { ...user });
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { token, user },
        });
      }
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: actionTypes.LOGIN_FAILUER,
        payload: error.response.data,
      });
    }
  };
};
export const clearError = () => {
  return { type: 'CLEAR_ERROR' };
};
export const userLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });
    const res = await axios.post('/admin/logout');
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: actionTypes.LOGOUT_SUCCESS,
      });
      dispatch({ type: 'RELOAD_CART' });
    } else {
      dispatch({
        type: actionTypes.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
export const registerUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    try {
      const res = await axios.post('/register', { ...user });
      if (res.status === 201) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        const { message } = res.data;
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          payload: {
            message: message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.REGISTER_FAILURE,
        payload: err.response.data,
      });
    }
  };
};
