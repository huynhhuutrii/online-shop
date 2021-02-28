import axios from '../../helpers';
import * as actionTypes from '../constants';
import { toast } from 'react-toastify';
export const currentProduct = (id) => {
  return async (dispatch) => {
    const res = await axios.post(`/product/detail/${id}`);
    if (res.status === 200) {
      dispatch({
        type: actionTypes.GET_PRODUCT_DETAIL,
        payload: res.data.product,
      });
    }
  };
};
export const listProductSearch = (key) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('product/search', { key });
      console.log(res);
      dispatch({
        type: actionTypes.GET_PRODUCTS_SEARCH,
        payload: res.data.searchResult,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteReview = (data) => {
  return async (dispatch) => {
    const res = await axios.put('/product/review/delete', data);
    if (res.status === 200) {
      toast.warning('Đã xóa đánh giá');
      dispatch({
        type: actionTypes.DELETE_PRODUCT_REVIEW,
        payload: res.data.product,
      });
    }
  };
};
export const getNewProducts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/product/new');
      dispatch({
        type: actionTypes.GET_NEW_PRODUCTS,
        payload: res.data.newProducts,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getRandomProducts = () => {
  return async (dispatch) => {
    const res = await axios.get('/product/random');
    if (res.status === 200) {
      dispatch({
        type: actionTypes.GET_RANDOM_PRODUCT,
        payload: res.data.products,
      });
    }
  };
};
export const sendReviewAction = (data) => {
  return async (dispatch) => {
    const res = await axios.put('/product/review/add', data);
    if (res.status === 200) {
      toast.success('Gửi đánh giá thành công');
      dispatch({
        type: actionTypes.PRODUCT_REVIEW,
        payload: res.data.review,
      });
    }
  };
};
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

export const getProductBySlug = (slug, priceRange) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/product/${slug}/${priceRange}`);
      dispatch({
        type: actionTypes.GET_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data.listProduct,
      });
    } catch {
      alert('có lỗi');
    }
  };
};
