import axios from '../../helpers';
import * as actionTypes from '../constants';

export const getOrders = (userID) => {
  return async (dispatch) => {
    const res = await axios.post('/order/list', { userID });
    if (res.status === 200) {
      dispatch({
        type: actionTypes.GET_ORDER_SUCCESS,
        payload: res.data.listOrder,
      });
    }
    if (res.status === 400) {
      dispatch({ type: actionTypes.GET_ORDER_FALURE });
    }
  };
};
export const cancelOrder = (id) => {
  return async (dispatch) => {
    const res = await axios.put('/order/cancel', { id });
    if (res.status === 200) {
      dispatch({ type: actionTypes.ORDER_CANCEL, payload: id });
    }
  };
};
export const getPurchasedProduct = (userID) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/review/purchased', { userID });
      dispatch({
        type: actionTypes.GET_PURCHASED_PRODUCT,
        payload: res.data.products,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const sendOrder = (order) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/order', { ...order });
      dispatch({ type: actionTypes.ORDER_REQUEST, payload: res.data.newOrder });
      if (res.status === 201) {
        window.localStorage.removeItem('cart');
        window.localStorage.removeItem('orderInfo');
        dispatch({ type: actionTypes.ORDER_SUCCESS });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
