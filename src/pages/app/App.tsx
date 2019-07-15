import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import Modal from 'react-modal';

import Types from 'Types'

import styles from './app.scss';

import { AppAction } from '../../redux/reducers/app'
import { APP_LOAD } from '../../redux/actions/actionTypes';
import { Journals } from '../journals';
import { Journal } from '../journal';
import { Login } from '../login';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { NavBar } from '../../components/NavBar';
import { fetchJournals } from '../../redux/actions/journal';


interface AppProps {
  appLoaded: boolean;
  journals: Types.Journal[];
  onLoad: () => null;
  onFetchJournals: () => null;
}

const content = (
  <div className='app'>
    <NavBar />
    <div className='content-wrapper'>
      <Switch>
        <Route exact path="/login" component={ Login }/>
        <ProtectedRoute exact path="/" component={ Journals }/>
        <ProtectedRoute exact path="/journal/:journalId" component={ Journal }/>
      </Switch>
    </div>
  </div>
)

Modal.setAppElement('#root')

class AppPage extends React.Component<AppProps> {
  componentDidMount() {
    if (!this.props.journals.length) {
      this.props.onFetchJournals();
    }

    this.props.onLoad();
  }

  render () {
    return (
      <div className={ styles.app }>
        { this.props.appLoaded ? content: "" }
      </div>
    )
  };
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    appLoaded: state.app.appLoaded,
    journals: state.journal.journals,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  onLoad: () => dispatch({ type: APP_LOAD }),
  // @ts-ignore
  onFetchJournals: () => dispatch(fetchJournals()),
});


export const App = connect(mapStateToProps, mapDispatchToProps)(AppPage);
