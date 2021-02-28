import * as actionTypes from '../constants';

const initialState = {
  orders: [],
};
const update = (orders, id) => {
  for (let order of orders) {
    if (order._id.toString() === id.toString()) {
      order.status = 'Đã thanh toán';
    }
  }
  return orders;
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.UPDATE_ORDER:
      const orderIndex = state.orders.findIndex(
        (c) => c._id === action.payload
      );
      const newOrder = [...state.orders];
      newOrder[orderIndex].status = 'Đã thanh toán';
      return {
        ...state,
        orders: newOrder,
      };
    case actionTypes.SEARCH_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    default:
      return state;
  }
};
