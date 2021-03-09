import { combineReducers } from 'redux';
import auth from './userReducer';
import alert from './alertReducer';
import theme from './themeReducer';

export const rootReducer = combineReducers({
  auth,
  alert,
  theme,
});
