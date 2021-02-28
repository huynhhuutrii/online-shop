import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import userReducer from './user.reducer';
import homeReducer from './home.reducer';
const appReducer = combineReducers({
  authReducer,
  productReducer,
  categoryReducer,
  orderReducer,
  userReducer,
  homeReducer,
});
export default appReducer;
