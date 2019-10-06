import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { getFirestore, reduxFirestore } from 'redux-firestore'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import fbConfig from '../firebase/firebase'
import createRootReducer from './reducer'

export const history = createHashHistory()

const middleware = routerMiddleware(history)
const composedMiddleware =
  process.env.NODE_ENV === 'production'
    ? compose(
        applyMiddleware(
          middleware,
          thunk.withExtraArgument({ getFirebase, getFirestore })
        ),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
      )
    : composeWithDevTools(
        applyMiddleware(
          middleware,
          thunk.withExtraArgument({ getFirebase, getFirestore }),
          createLogger()
        ),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
      )

export const store = createStore(createRootReducer(history), composedMiddleware)
