import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import  Big from 'big.js';
import DatePicker from 'react-datepicker';

import Types from 'Types';

import { createTrade } from '../../redux/actions/journal';
import { Money } from '../../utils/moolah';

import './tradeQuickCreate.scss';

interface TradeQuickCreateProps {
  className?: string;
  journal: Types.Journal;
  onCreateTrade: (trade: Types.Trade) => null;
}

interface TradeQuickCreateState {
  instrument: string;
  strategy: string;
  kind: 'long' | 'short';
  entryDate: Date;
  entryPrice: Big;
  positionSize: Big;
  stopLoss: Big;
  takeProfit: Big;
  exitDate: Date;
  exitPrice: Big;
  pl: Money;
  auth: any;
}

class TradeQuickCreateComponent extends Component<TradeQuickCreateProps, TradeQuickCreateState> {
  constructor(props: TradeQuickCreateProps) {
    super(props);

    this.state = {
      instrument: '',
      strategy: '',
      kind: 'long',
      entryDate: null,
      entryPrice: null,
      positionSize: null,
      stopLoss: null,
      takeProfit: null,
      exitDate: null,
      exitPrice: null,
      pl: null,
      auth: {},
    }
  }

  updateInputState = (key: string, val: string | Date) => {
    let processedVal: string | Money | Date | Big;

    if (key in ['entryPrice', 'stopLoss', 'takeProfit', 'exitPrice', 'pl'] && typeof val === 'string') {
      processedVal = new Money(val, this.props.journal.currency);
    } else if (key in ['entryDate', 'exitDate']) {
      processedVal = val;
    } else if (key in ['positionSize'] && typeof val === 'string') {
      processedVal = new Big(val);
    } else {
      processedVal = val;
    }

    this.setState((prevState: TradeQuickCreateState) => {
      return {
        ...prevState,
        [key]: processedVal,
      }
    })
  }

  createTrade = () => {
    let trade: Types.Trade = {
      id: null,
      journalId: this.props.journal.id,
      created: new Date(),
      modified: new Date(),
      instrument: this.state.instrument,
      strategy: this.state.strategy,
      kind: this.state.kind,
      entryDate: this.state.entryDate,
      entryPrice: this.state.entryPrice,
      positionSize: this.state.positionSize,
      stopLoss: this.state.stopLoss,
      takeProfit: this.state.takeProfit,
      exitDate: this.state.exitDate,
      exitPrice: this.state.exitPrice,
      fees: new Money('0', this.props.journal.currency),
      pl: this.state.pl,
      hitTakeProfit: null,
      tags: [],
      entryComment: '',
      duringComment: '',
      exitComment: '',
      flag: false,
      emotion: [],
      rating: null,
      charts: [],
    }

    this.setState((prevState: TradeQuickCreateState) => {
      return {
        ...prevState,
        instrument: '',
        strategy: '',
        kind: 'long',
        entryDate: new Date(),
        entryPrice: new Big('0'),
        positionSize: new Big('0'),
        stopLoss: new Big('0'),
        takeProfit: new Big('0'),
        exitDate: null,
        exitPrice: null,
        pl: null,
      }
    })

    this.props.onCreateTrade(trade);
  }

  render() {
    return (
      <div className='trade-quick-create container'>
        <div className='input-group mb-3'>
          <input type="text"
                className="form-control col-sm-2"
                placeholder="Instrument"
                value={ this.state.instrument }
                onChange={ (e) => this.updateInputState('instrument', e.target.value) }
          />
          <input type="text"
                className="form-control col-sm-2"
                placeholder="Strategy"
                value={ this.state.strategy }
                onChange={ (e) => this.updateInputState('strategy', e.target.value) }
          />
          <select className="custom-select col-sm-1"
                  value={ this.state.kind }
                  onChange={ (e) => this.updateInputState('kind', e.target.value as 'live' | 'demo' | 'backtest') }
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
          <div
              className="trade-quick-create-date form-control col-sm-2"
          >
            <DatePicker
              selected={ this.state.entryDate }
              onChange={ (d) => this.updateInputState('entryDate', d)}
              placeholderText="Entry Date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <input type="text"
                className="form-control col-sm-1"
                placeholder="Entry Price"
                value={ this.state.entryPrice ? this.state.entryPrice.toString() : undefined }
                onChange={ (e) => this.updateInputState('entryPrice', e.target.value) }
          />
          <input type="number"
                className="form-control col-sm-1"
                placeholder="Size"
                value={ this.state.positionSize ? this.state.positionSize.toString() : undefined }
                onChange={ (e) => this.updateInputState('positionSize', e.target.value) }
          />
          <input type="text"
                className="form-control col-sm-1"
                placeholder="Stop Loss"
                value={ this.state.stopLoss ? this.state.stopLoss.toString() : undefined }
                onChange={ (e) => this.updateInputState('stopLoss', e.target.value) }
          />
          <input type="text"
                className="form-control col-sm-1"
                placeholder="Take Profit"
                value={ this.state.takeProfit ? this.state.takeProfit.toString() : undefined }
                onChange={ (e) => this.updateInputState('takeProfit', e.target.value) }
          />
          <button className="btn btn-outline-primary trade-quick-create-button form-control col-sm-1" type="button" onClick={ this.createTrade }>Create</button>
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

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  // @ts-ignore
  onCreateTrade: (trade: Types.Trade) => dispatch(createTrade(trade)),
});

export const TradeQuickCreate = connect(mapStateToProps, mapDispatchToProps)(TradeQuickCreateComponent);