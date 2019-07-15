import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { firestore } from 'firebase';

import Types from 'Types';

import { Heading } from '../../components/Heading';
import { JournalList } from '../../components/JournalList';
import { JournalCreate } from '../../components/JournalCreate';
import { JournalAction } from '../../redux/reducers/journal';

import styles from './journals.scss';
import { fetchJournals } from '../../redux/actions/journal';

interface JournalsProps {
  journals: Types.Journal[];
  onFetchJournals: () => null;
}

interface JournalsState {
  selectedJournal: Types.Journal | null;
}

class JournalsPage extends Component<JournalsProps, JournalsState> {
  constructor(props: JournalsProps) {
    super(props);

    this.state = {
      selectedJournal: null,
    }
  }

  componentDidMount() {
    if (!this.props.journals.length) {
      this.props.onFetchJournals();
    }
  }

  render() {
    return (
      <div className={ styles.journals }>
        <Heading className={ styles.journalsHeading } text="Journals" />

        <JournalCreate />
        <JournalList
          className={ styles.journalList }
          journals={ this.props.journals }
        />
      </div>
    )
  }
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    journals: state.journal.journals,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onFetchJournals: () => dispatch(fetchJournals()),
});

export const Journals = connect(mapStateToProps, mapDispatchToProps)(JournalsPage);