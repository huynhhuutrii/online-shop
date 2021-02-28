import axios from '../../helpers';
import * as actionTypes from '../constants';

export const setCategories = (cats) => {
  return {
    type: actionTypes.SET_CATEGORIES,
    payload: cats,
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_CATEGORY_RQ });
    try {
      const res = await axios.get('/category/getcategory');
      const { listCategory } = res.data;

      dispatch({
        type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
        payloads: {
          categories: listCategory,
        },
      });
    } catch (err) {
      dispatch({
        type: actionTypes.GET_ALL_CATEGORY_FAILURE,
        payloads: { error: JSON.stringify(err) },
      });
    }
  };
};
export const updateCategories = (cat) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_CATEGORY_REQUEST });
    const res = await axios.post('/category/update', cat);
    if (res.status === 201) {
      dispatch({ type: actionTypes.UPDATE_CATEGORY_SUCCESS });
      return true;
    } else {
      dispatch({
        type: actionTypes.UPDATE_CATEGORY_FAILURE,
        payloads: { error: res.data.error },
      });
    }
  };
};
export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CATEGORY_REQUEST });
    const res = await axios.post('/category/delete', { id });

    if (res.status === 200) {
      dispatch({ type: actionTypes.DELETE_CATEGORY_SUCCESS });
      return true;
    } else {
      dispatch({
        type: actionTypes.DELETE_CATEGORY_FAILURE,
        payloads: {
          error: res.data.error,
        },
      });
    }
  };
};
export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_CATEGORY_REQUEST });
    try {
      const res = await axios.post('/category/create', form);
      if (res.status === 201) {
        dispatch({
          type: actionTypes.ADD_CATEGORY_SUCCESS,
          payloads: { category: res.data.category },
        });
        dispatch(getCategory());
      } else {
        dispatch({
          type: actionTypes.ADD_CATEGORY_FAILURE,
          payloads: {
            error: res.data.error,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
