import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'connected-react-router'
// import { createBrowserHistory } from 'history';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import fbConfig from '../firebase/firebase';

import createRootReducer from './reducer';

// export const history = createBrowserHistory();
export const history = createHashHistory();

const middleware = routerMiddleware(history);
const composedMiddleware = process.env.NODE_ENV === 'production'
                          ? compose(
                              applyMiddleware(middleware, thunk.withExtraArgument({getFirebase, getFirestore})),
                              reduxFirestore(fbConfig),
                              reactReduxFirebase(fbConfig, {attachAuthIsReady: true}),
                            )
                          : composeWithDevTools(
                              applyMiddleware(middleware, thunk.withExtraArgument({getFirebase, getFirestore}), createLogger()),
                              reduxFirestore(fbConfig),
                              reactReduxFirebase(fbConfig, {attachAuthIsReady: true}),
                            );

export const store = createStore(createRootReducer(history), composedMiddleware);
