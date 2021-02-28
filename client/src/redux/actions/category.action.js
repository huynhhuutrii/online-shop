import axios from "../../helpers"
import * as actionTypes from "../constants";
export const getCategory = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_CATEGORY_RQ })
    try {
      const res = await axios.get("/category/getcategory");
      const { listCategory } = res.data;
      dispatch({
        type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
        payloads: { categories: listCategory }
      })
    } catch (err) {
      dispatch({
        type: actionTypes.GET_ALL_CATEGORY_FAILURE,
        payloads: { error: JSON.stringify(err) }
      })
    }
  }
}
