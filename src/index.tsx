import '@fortawesome/fontawesome-free/js/brands'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/solid'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { App } from './pages/app'
import { history, store } from './redux/store'
import './style.scss'
import './foundation.scss'
import 'react-datepicker/dist/react-datepicker.css'
import './react-tags.scss'
import 'react-confirm-alert/src/react-confirm-alert.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
