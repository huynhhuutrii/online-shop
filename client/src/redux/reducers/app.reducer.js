import { combineReducers } from 'redux';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import orderReducer from './order.reducer';
const appReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
});
export default appReducer;
