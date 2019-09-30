import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/solid';
import 'bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './custom.scss';
import { App } from './pages/app';
import './react-tags.scss';
import { history, store } from './redux/store';
import './style.scss';



ReactDOM.render((
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <Switch>
                <Route path='/' component={ App } />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
