import authReducer from './auth';
import userAddresses from './addresses';
import cartReducer from './cart';
import barberReducer from './barbers'
import { combineReducers } from 'redux';
import notificationReducer from './notification'

export default combineReducers({
  authReducer,
  userAddresses,
  cartReducer,
  barberReducer,
  notificationReducer,
});
