import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Types from 'Types';

import { Heading } from '../../components/Heading';
import { TradeList } from '../../components/TradeList';
import { TradeQuickCreate } from '../../components/TradeQuickCreate';
import { JournalAction } from '../../redux/reducers/journal';

import styles from './journal.scss';
import { fetchTrades } from '../../redux/actions/journal';
import { match } from 'react-router';

interface JournalPageProps {
  journals: Types.Journal[];
  trades: Types.Trade[];
  match: match<{ journalId: string }>;
  onFetchTrades: (journal: Types.Journal) => null;
}

interface JournalPageState {
  journal: Types.Journal;
  selectedTrade: Types.Trade | null;
}

class JournalPage extends Component<JournalPageProps, JournalPageState> {
  constructor(props: JournalPageProps) {
    super(props);

    this.state = {
      journal: null,
      selectedTrade: null,
    }
  }

  componentDidMount() {
    if (this.props.journals.length) {
      let journal = this.props.journals.find(j => j.id === this.props.match.params.journalId);

      this.props.onFetchTrades(journal);

      this.setState((prevState: JournalPageState) => {
        return {
          ...prevState,
          journal: journal,
        }
      })
    }
  }

  componentDidUpdate(prevProps: JournalPageProps) {

    if (this.props.journals.length !== prevProps.journals.length) {
      let journal = this.props.journals.find(j => j.id === this.props.match.params.journalId);

      if (!this.props.trades.length || this.props.trades[0].journalId !== journal.id) {
        this.props.onFetchTrades(journal);
        this.setState((prevState: JournalPageState) => {
          return {
            ...prevState,
            journal: journal,
          }
        })
      }
    }
  }

  render() {
    return (
      <div className='journal'>
        { this.state.journal ? <Heading className={ styles.journalsHeading } text={ this.state.journal.name } /> : ''}
        { this.state.journal ? <TradeQuickCreate journal={ this.state.journal } /> : ''}
        
        <TradeList trades={ this.props.trades } />
      </div>
    )
  }
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    trades: state.journal.trades,
    journals: state.journal.journals,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onFetchTrades: (journal: Types.Journal) => dispatch(fetchTrades(journal)),
});

export const Journal = connect(mapStateToProps, mapDispatchToProps)(JournalPage);