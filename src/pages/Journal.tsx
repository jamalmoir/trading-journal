import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import Types from 'Types';
import { Heading } from '../components/Heading';
import { TradeFilter } from '../components/TradeFilter';
import { TradeList } from '../components/TradeList';
import { TradeQuickCreate } from '../components/TradeQuickCreate';
import { routeChange } from '../redux/actions/app';
import { setActiveJournal } from '../redux/actions/journal';
import { JournalAction } from '../redux/reducers/journal';
import { getFilteredTrades } from '../redux/selectors/journal';


interface JournalPageProps {
  journals: Types.Journal[];
  trades: Types.Trade[];
  match: match<{ journalId: string }>;
  activeJournal: Types.Journal;
  onSetActiveJournal: (journal: Types.Journal) => null;
  onRouteChange: (route: any) => null;
}


class JournalPage extends Component<JournalPageProps> {
  constructor(props: JournalPageProps) {
    super(props);

    this.props.onRouteChange(this.props.match)

    if (this.props.journals.length) {
      let journal = this.props.journals.find(j => j.id === this.props.match.params.journalId);
      this.props.onSetActiveJournal(journal);
    }
  }

  componentDidUpdate(prevProps: JournalPageProps) {
    if (prevProps.journals.length !== this.props.journals.length && this.props.journals.length && this.props.activeJournal == null) {
      let journal = this.props.journals.find(j => j.id === this.props.match.params.journalId);
      this.props.onSetActiveJournal(journal);
    }
  }

  render() {
    return (
      <div className='journal'>
        { this.props.activeJournal ? <Heading className='journals-heading' text={ this.props.activeJournal.name } /> : ''}
        { this.props.activeJournal ? <TradeFilter /> : ''}
        { this.props.activeJournal ? <TradeQuickCreate journal={ this.props.activeJournal } /> : ''}
        
        <TradeList trades={ this.props.trades } />
      </div>
    )
  }
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    trades: getFilteredTrades(state),
    journals: state.journal.journals,
    activeJournal: state.journal.activeJournal,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onRouteChange: (route: any) => dispatch(routeChange(route)),
  // @ts-ignore
  onSetActiveJournal: (journal: Types.Journal) => dispatch(setActiveJournal(journal)),
});

export const Journal = connect(mapStateToProps, mapDispatchToProps)(JournalPage);