import Big from 'big.js';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Types from 'Types';
import { createTrade } from '../../redux/actions/journal';
import './tradeQuickCreate.scss';
import { TextInput } from '../TextInput';
import { buildTrade } from '../../utils/utils';


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
      auth: {},
    }
  }

  updateInputState = (key: string, val: string | Date) => {
    this.setState((prevState: TradeQuickCreateState) => {
      return {
        ...prevState,
        [key]: val,
      }
    })
  }

  createTrade = () => {
    let trade = buildTrade({ journal: this.props.journal, ...this.state});

    this.setState((prevState: TradeQuickCreateState) => {
      return {
        ...prevState,
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
      }
    })

    this.props.onCreateTrade(trade);
  }

  render() {
    return (
      <div className='trade-quick-create container'>
        <div className='input-group mb-3'>
          <TextInput type='text'
                className="form-control col-sm-2"
                placeholder="Instrument"
                value={ this.state.instrument }
                onChange={ (e) => this.updateInputState('instrument', e.target.value) }
          />
          <TextInput type="text"
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
          <TextInput type="text"
                className="form-control col-sm-1"
                placeholder="Entry Price"
                value={ this.state.entryPrice ? this.state.entryPrice.toString() : undefined }
                onChange={ (e) => this.updateInputState('entryPrice', e.target.value) }
          />
          <TextInput type="number"
                className="form-control col-sm-1"
                placeholder="Size"
                value={ this.state.positionSize ? this.state.positionSize.toString() : undefined }
                onChange={ (e) => this.updateInputState('positionSize', e.target.value) }
          />
          <TextInput type="text"
                className="form-control col-sm-1"
                placeholder="Stop Loss"
                value={ this.state.stopLoss ? this.state.stopLoss.toString() : undefined }
                onChange={ (e) => this.updateInputState('stopLoss', e.target.value) }
          />
          <TextInput type="text"
                className="form-control col-sm-1"
                placeholder="Take Profit"
                value={ this.state.takeProfit ? this.state.takeProfit.toString() : undefined }
                onChange={ (e) => this.updateInputState('takeProfit', e.target.value) }
          />
          <button className="btn btn-outline-primary trade-quick-create-button form-control col-sm-1" type="button" onClick={ this.createTrade }>
            Create
          </button>
        </div>
      </div>
    )
  }
}

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