import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import Types from 'Types';
import { NavBar } from '../../components/NavBar';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { APP_LOAD } from '../../redux/actions/actionTypes';
import { fetchJournals, fetchTrades, clearTrades } from '../../redux/actions/journal';
import { AppAction } from '../../redux/reducers/app';
import { Journal } from '../Journal';
import { Journals } from '../Journals';
import { Login } from '../login';
import { Trade } from '../trade';
import styles from './app.scss';


interface AppProps {
  appLoaded: boolean;
  journals: Types.Journal[];
  activeJournal: Types.Journal;
  auth: any;
  onLoad: () => null;
  onFetchJournals: () => null;
  onFetchTrades: (journal: Types.Journal) => null;
  onClearTrades: () => null;
}

const content = (
  <div className='app'>
    <NavBar />
    <div className='content-wrapper'>
      <Switch>
        <Route exact path="/login" component={ Login }/>
        <ProtectedRoute exact path="/" component={ Journals }/>
        <ProtectedRoute exact path="/journal/:journalId" component={ Journal }/>
        <ProtectedRoute exact path="/journal/:journalId/trade/:tradeId" component={ Trade }/>
      </Switch>
    </div>
  </div>
)

class AppPage extends React.Component<AppProps> {
  componentDidMount() {
    if (!this.props.journals.length && this.props.auth.uid) {
      this.props.onFetchJournals();
    }

    this.props.onLoad();
  }

  componentDidUpdate(prevProps: AppProps) {
    if (this.props.activeJournal !== prevProps.activeJournal) {
      if (this.props.activeJournal) {
        this.props.onFetchTrades(this.props.activeJournal);
      } else {
        this.props.onClearTrades()
      }
    }
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
    auth: state.firebase.auth,
    journals: state.journal.journals,
    activeJournal: state.journal.activeJournal,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  onLoad: () => dispatch({ type: APP_LOAD }),
  // @ts-ignore
  onFetchJournals: () => dispatch(fetchJournals()),
  // @ts-ignore
  onFetchTrades: (journal: Types.Journal) => dispatch(fetchTrades(journal)),
  // @ts-ignore
  onClearTrades: () => dispatch(clearTrades()),
});


export const App = connect(mapStateToProps, mapDispatchToProps)(AppPage);
