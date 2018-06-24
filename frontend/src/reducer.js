import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import profile from './reducers/profile';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  profile,
  router: routerReducer
});
