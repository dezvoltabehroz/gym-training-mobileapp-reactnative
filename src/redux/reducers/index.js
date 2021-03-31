import authReducer from './auth';
import { combineReducers } from 'redux';
import notificationReducer from './notification'

export default combineReducers({
  authReducer,
  notificationReducer,
});
