import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Types from 'Types';
import { createJournal } from '../redux/actions/journal';
import { JournalAction } from '../redux/reducers/journal';
import { TextInput } from './TextInput';
import { CurrencyCode, isCurrencyCode } from '../utils/moolah';


interface JournalCreateProps {
  className?: string;
  onCreateJournal: (journal: Types.Journal) => null;
  auth: any,
}

const JournalCreateComponent = (props: JournalCreateProps) => {
  const [journalName, setJournalName]: [string, (val: string) => void] = useState('');
  const [journalKind, setJournalKind]: [Types.JournalKind, (val: Types.JournalKind) => void] = useState<Types.JournalKind>('live');
  const [journalCurrency, setJournalCurrency]: [CurrencyCode, (val: CurrencyCode) => void] = useState<CurrencyCode>('USD');

  const updateJournalName = (val: string) => {
    setJournalName(val);
  }

  const updateJournalKind = (val: 'live' | 'demo' | 'backtest') => {
    setJournalKind(val);
  }

  const updateJournalCurrency = (val: string) => {
    if (isCurrencyCode(val)) {
      setJournalCurrency(val);
    }
  }

  const createJournal = () => {
    let journal: Types.Journal = {
      id: null,
      userId: props.auth.uid,
      kind: journalKind,
      currency: journalCurrency,
      name: journalName,
      created: new Date(),
      modified: new Date(),
      tradeCount: 0,
    }

    setJournalName('');
    setJournalKind('live');
    setJournalCurrency('USD');
    props.onCreateJournal(journal);
  }

  return (
    <div className={ props.className + ' input-group mb-3'}>
      <TextInput type="text"
              className="form-control col-8"
              placeholder="Journal name"
              value={ journalName }
              onChange={ (e) => updateJournalName(e.target.value) }
      />
      <select className="form-control custom-select col-4"
              value={ journalKind }
              onChange={ (e) => updateJournalKind(e.target.value as 'live' | 'demo' | 'backtest') }
      >
        <option value="live">Live</option>
        <option value="demo">Demo</option>
        <option value="backtest">Backtest</option>
      </select>
      <TextInput type="text"
              className="form-control col-8"
              placeholder="Currency"
              value={ journalCurrency }
              onChange={ (e) => updateJournalCurrency(e.target.value) }
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary" type="button" onClick={ createJournal }>Create</button>
      </div>
    </div>
  )
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

export const JournalCreate = connect(mapStateToProps, mapDispatchToProps)(JournalCreateComponent);