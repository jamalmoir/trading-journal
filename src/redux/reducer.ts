import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import app from './reducers/app';
import auth from './reducers/auth';
import journal from './reducers/journal';

export default (history: History) => combineReducers({
  app,
  auth,
  journal,
  router: connectRouter(history),
  firebase: firebaseReducer,
});