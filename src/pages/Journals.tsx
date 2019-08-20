import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import Types from 'Types';
import { Heading } from '../components/Heading';
import { JournalCreate } from '../components/JournalCreate';
import { JournalList } from '../components/JournalList';
import { routeChange } from '../redux/actions/app';
import { JournalAction } from '../redux/reducers/journal';


interface JournalsProps {
  journals: Types.Journal[];
  match: match;
  onRouteChange: (route: any) => null;
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

  componentWillMount() {
    this.props.onRouteChange(this.props.match)
  }

  render() {
    return (
      <div className='journals'>
        <Heading className='journals-heading' text="Journals" />

        <JournalCreate />
        <JournalList
          className='journal-list'
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
  onRouteChange: (route: any) => dispatch(routeChange(location)),
});

export const Journals = connect(mapStateToProps, mapDispatchToProps)(JournalsPage);