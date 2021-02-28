import axios from '../../helpers';
import * as actionTypes from '../constants';
export const updateOrder = (idOrder) => {
  return async (dispatch) => {
    const res = await axios.put('/order/update', { idOrder });

    if (res.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_ORDER,
        payload: idOrder,
      });
    }
  };
};
export const searchOrder = (key) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/order/search', { key });
      dispatch({
        type: actionTypes.SEARCH_ORDER,
        payload: res.data.searchResult,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteOrder = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/order/delete', { id });
      if (res.status === 200) {
        dispatch({ type: actionTypes.DELETE_ORDER, payload: id });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const getAllOrder = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/order/all');
      dispatch({ type: actionTypes.GET_ALL_ORDER, payload: res.data.allOrder });
    } catch (err) {
      console.log(err);
    }
  };
};
