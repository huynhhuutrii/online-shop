import * as actionTypes from '../constants';
import axios from '../../helpers';

export const getAllProduct = () => {
  return async (dispatch) => {
    const res = await axios.get('/product/all');

    if (res.status === 200) {
      dispatch({
        type: actionTypes.GET_ALL_PRODUCT,
        payload: res.data.products,
      });
    }
  };
};
export const searchProduct = (key) => {
  return async (dispatch) => {
    const res = await axios.post('product/search', { key });
    dispatch({
      type: actionTypes.SEARCH_PRODUCT,
      payload: res.data.searchResult,
    });
  };
};
export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axios.post('/product/createproduct', form);
    if (res.status === 201) {
      dispatch({
        type: actionTypes.ADD_NEW_PRODUCT,
        payload: res.data.product,
      });
      dispatch(getAllProduct());
    }
  };
};
export const updateProduct = (form) => {
  return async (dispatch) => {
    try {
      const res = await axios.put('/product/update', form);
      dispatch({ type: actionTypes.UPDATE_PRODUCT, payload: res.data.product });
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteReview = (idReview, idProduct) => {
  return async (dispatch) => {
    const res = await axios.put('product/review/delete', {
      idReview,
      idProduct,
    });
    if (res.status === 200) {
      dispatch({ type: actionTypes.DELETE_REVIEW, payload: idReview });
    }
  };
};
export const getAllReview = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/product/reviews');
      dispatch({
        type: actionTypes.GET_ALL_REVIEW,
        payload: res.data.allReview,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/product/delete', { id });
      if (res.status === 200) {
        dispatch({ type: actionTypes.DELETE_PRODUCT, payload: id });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
