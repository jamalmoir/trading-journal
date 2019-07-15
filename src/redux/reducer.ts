import app from './reducers/app';
import auth from './reducers/auth';
import journal  from './reducers/journal';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { firebaseReducer } from 'react-redux-firebase';

export default (history: History) => combineReducers({
  app,
  auth,
  journal,
  router: connectRouter(history),
  firebase: firebaseReducer,
});