import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import  Big from 'big.js';

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
  exitDate: Date
  exitPrice: Big;
  pl: Money;
  auth: any,
}

class TradeQuickCreateComponent extends Component<TradeQuickCreateProps, TradeQuickCreateState> {
  constructor(props: TradeQuickCreateProps) {
    super(props);

    this.state = {
      instrument: '',
      strategy: '',
      kind: 'long',
      entryDate: new Date(),
      entryPrice: new Big('0'),
      positionSize: new Big('0'),
      stopLoss: new Big('0'),
      takeProfit: new Big('0'),
      exitDate: new Date(),
      exitPrice: new Big('0'),
      pl: new Money('0', props.journal.currency),
      auth: {},
    }
  }

  updateInputState = (key: string, val: string) => {
    let processedVal: string | Money | Date | Big;

    if (key in ['entryPrice', 'stopLoss', 'takeProfit', 'exitPrice', 'pl']) {
      processedVal = new Money(val, this.props.journal.currency);
    } else if (key in ['entryDate', 'exitDate']) {
      processedVal = new Date(val);
      console.log(processedVal)
    } else if (key in ['positionSize']) {
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
        exitDate: new Date(),
        exitPrice: new Big('0'),
        pl: new Money('0', this.props.journal.currency),
      }
    })

    this.props.onCreateTrade(trade);
  }

  render() {
    return (
      <div className='trade-quick-create container'>
        <div className='row trade-quick-create-headings'>
          <div className='col'>Instrument</div>
          <div className='col'>Strategy</div>
          <div className='col'>Kind</div>
          <div className='col'>Entry Date</div>
          <div className='col'>Entry Price</div>
          <div className='col'>Position Size</div>
          <div className='col'>Stop Loss</div>
          <div className='col'>Take Profit</div>
          <div className='col'>Exit Date</div>
          <div className='col'>Exit Price</div>
          <div className='col'>P/L</div>
          <div className='col'></div>
        </div>
        <div className={'input-group mb-3'}>
          <input type="text"
                className="form-control col"
                placeholder="Instrument"
                value={ this.state.instrument }
                onChange={ (e) => this.updateInputState('instrument', e.target.value) }
          />
          <input type="text"
                className="form-control col"
                placeholder="Strategy"
                value={ this.state.strategy }
                onChange={ (e) => this.updateInputState('strategy', e.target.value) }
          />
          <select className="custom-select col"
                  value={ this.state.kind }
                  onChange={ (e) => this.updateInputState('kind', e.target.value as 'live' | 'demo' | 'backtest') }
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
          <input type="datetime-local"
                className="form-control col"
                placeholder="Entry Date"
                onChange={ (e) => this.updateInputState('entryDate', e.target.value) }
          />
          <input type="text"
                className="form-control col"
                placeholder="Entry Price"
                value={ this.state.entryPrice.toString() }
                onChange={ (e) => this.updateInputState('entryPrice', e.target.value) }
          />
          <input type="number"
                className="form-control col"
                placeholder="Position Size"
                value={ this.state.positionSize.toString() }
                onChange={ (e) => this.updateInputState('positionSize', e.target.value) }
          />
          <input type="text"
                className="form-control col"
                placeholder="Stop Loss"
                value={ this.state.stopLoss.toString() }
                onChange={ (e) => this.updateInputState('stopLoss', e.target.value) }
          />
          <input type="text"
                className="form-control col"
                placeholder="Take Profit"
                value={ this.state.takeProfit.toString() }
                onChange={ (e) => this.updateInputState('takeProfit', e.target.value) }
          />
          <input type="datetime-local"
                className="form-control col"
                placeholder="Exit Date"
                onChange={ (e) => console.log(e) }
          />
          <input type="text"
                className="form-control col"
                placeholder="Exit Price"
                value={ this.state.exitPrice.toString() }
                onChange={ (e) => this.updateInputState('exitPrice', e.target.value) }
          />
          <input type="text"
                className="form-control col"
                placeholder="P/L"
                value={ this.state.pl.toString() }
                onChange={ (e) => this.updateInputState('pl', e.target.value) }
          />
            <button className="btn btn-outline-primary trade-quick-create-button form-control col" type="button" onClick={ this.createTrade }>Create</button>
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