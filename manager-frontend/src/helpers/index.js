import axios from 'axios';

import { appStore } from '../redux/store';
import * as actionTypes from '../redux/constants';

const api = 'http://localhost:4000/api';
const token = window.localStorage.getItem('token');
const instance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});
instance.interceptors.request.use((req) => {
  const { authReducer } = appStore.getState();
  if (authReducer.token) {
    req.headers.Authorization = `Bearer ${authReducer.token}`;
  }
  return req;
});
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    const { status } = err.response;
    if (status === 500) {
      localStorage.clear();
      appStore.dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    }
    return Promise.reject(err);
  }
);
export default instance;
