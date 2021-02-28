import * as actionTypes from '../constants';
const initialState = {
  products: [],
  currentProduct: {},
  currentProductList: [],
  currentListProductByPrice: [],
  randomProducts: [],
  productsSearch: [],
  newProducts: [],
  purchasedProduct: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_BY_SLUG_SUCCESS: {
      return {
        ...state,
        currentListProductByPrice: action.payload,
      };
    }
    case actionTypes.GET_ALL_PRODUCT:
      return { ...state, products: action.payload };
    case actionTypes.PRODUCT_REVIEW:
      return { ...state, currentProduct: action.payload };
    case actionTypes.DELETE_PRODUCT_REVIEW:
      return { ...state, currentProduct: action.payload };
    case actionTypes.GET_PRODUCT_DETAIL:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case actionTypes.GET_PURCHASED_PRODUCT:
      return {
        ...state,
        purchasedProduct: action.payload,
      };
    case actionTypes.GET_PRODUCTS_SEARCH:
      return { ...state, productsSearch: action.payload };
    case actionTypes.GET_NEW_PRODUCTS:
      return { ...state, newProducts: action.payload };
    case actionTypes.GET_RANDOM_PRODUCT:
      return { ...state, randomProducts: action.payload };
    default:
      return state;
  }
};
