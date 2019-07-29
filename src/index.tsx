import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history } from './redux/store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { App } from './pages/app';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import 'bootstrap';
import './style.scss';
//import './greyson.scss';
//import './greyson.css';
import './fresca.scss';
import './react-tags.scss';
import 'react-datepicker/dist/react-datepicker.css';

// @ts-ignore
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render((
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <Switch>
                    <Route path='/' component={ App } />
                </Switch>
            </ConnectedRouter>
        </Provider>
    ), document.getElementById('root'));
})
