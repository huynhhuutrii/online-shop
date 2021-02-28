import * as actionTypes from '../constants';

const initialState = {
  orderInfo: {},
  orders: [],
  message: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_REQUEST:
      return {
        ...state,
        orderInfo: action.payload,
      };
    case actionTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.ORDER_CANCEL:
      const index = state.orders.findIndex((o) => o._id === action.payload);
      const newOrder = [...state.orders];
      newOrder[index].status = 'Đã hủy';
      return {
        ...state,
        orders: newOrder,
      };
    case actionTypes.GET_ORDER_FALURE:
      return {
        ...state,
        message: 'Bạn chưa có đơn hàng nào',
      };
    default:
      return state;
  }
};
