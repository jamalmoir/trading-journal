import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Types from 'Types';

import { createJournal } from '../../redux/actions/journal';
import { JournalAction } from '../../redux/reducers/journal';

interface JournalCreateProps {
  className?: string;
  onCreateJournal: (journal: Types.Journal) => null;
}

interface JournalCreateState {
  journalName: string;
  journalKind: 'live' | 'demo' | 'backtest',
  auth: any,
}

class JournalCreateComponent extends Component<JournalCreateProps, JournalCreateState> {
  constructor(props: JournalCreateProps) {
    super(props);

    this.state = {
      journalName: '',
      journalKind: 'live',
      auth: {},
    }
  }

  updateJournalName = (val: string) => {
    this.setState((prevState: JournalCreateState) => {
      return {
        ...prevState,
        journalName: val,
      }
    })
  }

  updateJournalKind = (val: 'live' | 'demo' | 'backtest') => {

    this.setState((prevState: JournalCreateState) => {
      return {
        ...prevState,
        journalKind: val as 'live' | 'demo' | 'backtest',
      }
    })
  }

  createJournal = () => {
    let journal: Types.Journal = {
      id: null,
      userId: this.state.auth.uid,
      kind: this.state.journalKind,
      currency: 'USD',
      name: this.state.journalName,
      created: new Date(),
      modified: new Date(),
      tradeCount: 0,
    }

    this.setState((prevState: JournalCreateState) => {
      return {
        ...prevState,
        journalName: '',
        journalKind: 'live'
      }
    })

    this.props.onCreateJournal(journal);
  }

  render() {
    return (
      <div className={ this.props.className + ' input-group mb-3'}>
        <input type="text"
               className="form-control col-8"
               placeholder="Journal name"
               value={ this.state.journalName }
               onChange={ (e) => this.updateJournalName(e.target.value) }
        />
        <select className="form-control custom-select col-4"
                value={ this.state.journalKind }
                onChange={ (e) => this.updateJournalKind(e.target.value as 'live' | 'demo' | 'backtest') }
        >
          <option value="live">Live</option>
          <option value="demo">Demo</option>
          <option value="backtest">Backtest</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" onClick={ this.createJournal }>Create</button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    auth: state.firebase.auth,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onCreateJournal: (journal: Types.Journal) => dispatch(createJournal(journal)),
});

export const JournalCreate = connect(null, mapDispatchToProps)(JournalCreateComponent);