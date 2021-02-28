import * as actionTypes from '../constants';
const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CART':
      return [...action.payload];
    case 'ADD_NEW_CART_ITEM': {
      const productIndex = state.findIndex((c) => c.id === action.payload.id);
      const oldCart = [...state];
      if (productIndex !== -1) {
        oldCart[productIndex].quantity =
          oldCart[productIndex].quantity + +action.payload.quantity;
      } else {
        oldCart.push(action.payload);
      }
      return oldCart;
    }
    case 'DELETE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'RELOAD_CART':
      return [];
    case actionTypes.ORDER_SUCCESS:
      return [];
    default:
      return state;
  }
}
