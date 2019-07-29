import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ReactTags from 'react-tag-autocomplete';

import Types from 'Types';

import { JournalAction } from '../../redux/reducers/journal';

import './trade.scss';
import { fetchTrades } from '../../redux/actions/journal';
import { match } from 'react-router';
import { Money } from '../../utils/moolah';
import Big from 'big.js';
import DatePicker from 'react-datepicker';
import { Heading } from '../../components/Heading';
import { routeChange } from '../../redux/actions/app';

interface TradePageProps {
  trades: Types.Trade[];
  journals: Types.Journal[];
  match: match<{ journalId: string, tradeId: string }>;
  onFetchTrades: (journal: Types.Journal | string) => null;
  onRouteChange: (route: any) => null;
}

interface TradePageState {
  trade: Types.Trade;
  journal: Types.Journal;
  tags: {
    tags: {id: string, name: string}[],
    suggestions: {id: string, name: string}[],
  };
  emotions: {
    entryTags: {id: string, name: string}[],
    exitTags: {id: string, name: string}[],
    suggestions: {id: string, name: string}[],
  };
  auth: any;
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TradePage extends Component<TradePageProps, TradePageState> {
  constructor(props: TradePageProps) {
    super(props);

    this.state = {
      trade: null,
      journal: null,
      tags: {
        tags: [],
        suggestions: [
          {id: 'Confident Entry', name: 'Confident Entry'},
          {id: 'Broke Rules', name: 'Broke Rules'},
        ]
      },
      emotions: {
        entryTags: [],
        exitTags: [],
        suggestions: [
          {id: 'Happy', name: 'Happy'},
          {id: 'Calm', name: 'Calm'},
          {id: 'FOMO', name: 'FOMO'},
          {id: 'Angry', name: 'Angry'},
          {id: 'Depressed', name: 'Depressed'},
          {id: 'Manic', name: 'Manic'},
        ]
      },
      auth: {},
    }
  }

  componentWillMount() {
    this.props.onRouteChange(this.props.match)
  }

  componentDidMount() {
    if (this.props.trades.length) {
      let trade = this.props.trades.find(t => t.id === this.props.match.params.tradeId &&
                                              t.journalId === this.props.match.params.journalId);
      let journal = this.props.journals.find(j => j.id === this.props.match.params.journalId);

      this.setState((prevState: TradePageState) => {
        return {
          ...prevState,
          trade: {...trade},
          journal: journal,
        }
      })
    } else {
      this.props.onFetchTrades(this.props.match.params.journalId);
    }
  }

  componentDidUpdate(prevProps: TradePageProps) {

    if (this.props.trades.length !== prevProps.trades.length) {
      let trade = this.props.trades.find(t => t.id === this.props.match.params.tradeId &&
                                              t.journalId === this.props.match.params.journalId);
      let journal = this.props.journals.find(j => j.id === this.props.match.params.journalId);

      this.setState((prevState: TradePageState) => {
        return {
          ...prevState,
          trade: {...trade},
          journal: journal,
        }
      })
    }
  }

  updateInputState = (key: string, val: string | Date | boolean) => {
    let processedVal: string | Money | Date | Big | boolean;
    const moneyValues = ['pl', 'fees'];
    const bigValues = ['entryPrice', 'positionSize', 'stopLoss', 'takeProfit', 'exitPrice'];

    if (key in moneyValues && typeof val === 'string') {
      processedVal = new Money(val, this.state.journal.currency);
    } else if (key in bigValues && typeof val === 'string') {
      processedVal = new Big(val);
    } else {
      processedVal = val;
    }

    this.setState((prevState: TradePageState) => {
      return {
        ...prevState,
        [key]: processedVal,
      }
    })
  }

  handleDelete = (i: number) => {
      this.setState((prevState: TradePageState) => {
        return {
          ...prevState,
          tags: {
            ...prevState.tags,
            tags: prevState.tags.tags.filter((tag, index) => index !== i),
          }
        }
      });
  }

  handleAddition = (tag: {id: string, name: string}) => {
      this.setState((prevState: TradePageState) => {
        return {
          ...prevState,
          tags: {
            ...prevState.tags,
            tags: [...prevState.tags.tags, tag]
          }
        }
      })
  }

  render() {
    
    return !this.state.trade || ! this.state.journal
    ? <div></div>
    :(
      <div className='trade'>
        <Heading text={ this.state.journal.name + " >> " + (this.state.trade.kind.charAt(0).toUpperCase() + this.state.trade.kind.slice(1)) + " " + this.state.trade.instrument + " Trade" } />
        <div className="trade-body row">
          <div className='trade-details trade-inputs col-sm-3'>
            <div className="card">
              <h5 className="card-header">Details</h5>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="trade-instrument">Instrument</label>
                  <input id="trade-instrument"
                        type="text"
                        className="form-control"
                        placeholder="Instrument"
                        value={ this.state.trade.instrument }
                        onChange={ (e) => this.updateInputState('instrument', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-strategy">Strategy</label>
                  <input id="trade-strategy"
                        type="text"
                        className="form-control"
                        placeholder="Strategy"
                        value={ this.state.trade.strategy }
                        onChange={ (e) => this.updateInputState('strategy', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-kind">Kind</label>
                  <input id="trade-kind"
                        type="text"
                        className="form-control"
                        placeholder="Kind"
                        value={ this.state.trade.kind }
                        onChange={ (e) => this.updateInputState('kind', e.target.value) }
                  />
                </div>
                <div className="form-check">
                  <input id="trade-flag"
                        type="checkbox"
                        className="form-check-input"
                        placeholder="Kind"
                        checked={ this.state.trade.flag }
                        onChange={ (e) => this.updateInputState('flag', e.target.value) }
                  />
                  <label htmlFor="trade-flag">Flag</label>
                </div>
                <div className="form-group">
                  <label>Tags</label>
                  <ReactTags tags={ this.state.tags.tags }
                            suggestions={ this.state.tags.suggestions }
                            handleDelete={ this.handleDelete }
                            handleAddition={ this.handleAddition } 
                            allowNew/>
                </div>
              </div>
            </div>
          </div>

          <div className='trade-entry trade-inputs col-sm-3'>
            <div className="card">
              <h5 className="card-header">Entry</h5>
              <div className="card-body">
                <div className="form-group">
                  <label>Entry Date</label>
                  <div className="trade-quick-create-date form-control">
                    <DatePicker
                      selected={ this.state.trade.entryDate }
                      onChange={ (d) => this.updateInputState('entryDate', d)}
                      placeholderText="Entry Date"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="trade-entry-price">Entry Price</label>
                  <input id="trade-entry-price"
                        type="text"
                        className="form-control"
                        placeholder="Entry Price"
                        value={ this.state.trade.entryPrice ? this.state.trade.entryPrice.toString() : '' }
                        onChange={ (e) => this.updateInputState('entryPrice', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-position-size">Position Size</label>
                  <input id="trade-position-size"
                        type="text"
                        className="form-control"
                        placeholder="Position Size"
                        value={ this.state.trade.positionSize ? this.state.trade.positionSize.toString() : '' }
                        onChange={ (e) => this.updateInputState('positionSize', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-stop-loss">Stop Loss</label>
                  <input id="trade-stop-loss"
                        type="text"
                        className="form-control"
                        placeholder="Stop Loss"
                        value={ this.state.trade.stopLoss ? this.state.trade.stopLoss.toString() : '' }
                        onChange={ (e) => this.updateInputState('stopLoss', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-take-profit">Take Profit</label>
                  <input id="trade-take-profit"
                        type="text"
                        className="form-control"
                        placeholder="Take Profit"
                        value={ this.state.trade.takeProfit ? this.state.trade.takeProfit.toString() : '' }
                        onChange={ (e) => this.updateInputState('takeProfit', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label>Entry Emotion</label>
                  <ReactTags tags={ this.state.emotions.entryTags }
                            suggestions={ this.state.emotions.suggestions }
                            placeholder='Add Emotion'
                            handleDelete={ this.handleDelete }
                            handleAddition={ this.handleAddition } 
                            allowNew/>
                </div>
              </div>
            </div>
          </div>

          <div className='trade-exit trade-inputs col-sm-3'>
            <div className="card">
              <h5 className="card-header">Exit</h5>
              <div className="card-body">
                <div className="form-group">
                  <label>Exit Date</label>
                  <div className="trade-quick-create-date form-control">
                    <DatePicker
                      selected={ this.state.trade.exitDate }
                      onChange={ (d) => this.updateInputState('exitDate', d)}
                      placeholderText="Exit Date"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="trade-exit-price">Exit Price</label>
                  <input id="trade-exit-price"
                        type="text"
                        className="form-control"
                        placeholder="Exit Price"
                        value={ this.state.trade.exitPrice ? this.state.trade.exitPrice.toString() : '' }
                        onChange={ (e) => this.updateInputState('exitPrice', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-fees">Fees</label>
                  <input id="trade-fees"
                        type="text"
                        className="form-control"
                        placeholder="Fees"
                        value={ this.state.trade.fees ? this.state.trade.fees.toString() : '' }
                        onChange={ (e) => this.updateInputState('fees', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-pl">P/L</label>
                  <input id="trade-pl"
                        type="text"
                        className="form-control"
                        placeholder="P/L"
                        value={ this.state.trade.pl ? this.state.trade.pl.toString() : '' }
                        onChange={ (e) => this.updateInputState('pl', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input id="trade-rating-n1"
                            className="form-check-input"
                            type="radio"
                            value="-1" 
                            onChange={ (e) => this.updateInputState('rating', e.target.value) }
                      />
                      <label className="form-check-label" htmlFor="trade-rating-n1">-1</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input id="trade-rating-0"
                            className="form-check-input"
                            type="radio"
                            value="0" 
                            onChange={ (e) => this.updateInputState('rating', e.target.value) }
                      />
                      <label className="form-check-label" htmlFor="trade-rating-0">0</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input id="trade-rating-1"
                            className="form-check-input"
                            type="radio"
                            value="1" 
                            onChange={ (e) => this.updateInputState('rating', e.target.value) }
                      />
                      <label className="form-check-label" htmlFor="trade-rating-1">1</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Exit Emotion</label>
                  <ReactTags tags={ this.state.emotions.exitTags }
                            placeholder='Add Emotion'
                            suggestions={ this.state.emotions.suggestions }
                            handleDelete={ this.handleDelete }
                            handleAddition={ this.handleAddition } 
                            allowNew/>
                </div>
              </div>
            </div>
          </div>

          <div className='trade-price trade-inputs col-sm-3'>
            <div className="card">
              <h5 className="card-header">Price Action</h5>
              <div className="card-body">
                <div className="form-group">
                  <label>Hit Take Profit</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input id="trade-htp-yes"
                            className="form-check-input"
                            type="radio"
                            value="yes" 
                            onChange={ (e) => this.updateInputState('hitTakeProfit', e.target.value) }
                      />
                      <label className="form-check-label" htmlFor="trade-htp-yes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input id="trade-htp-no"
                            className="form-check-input"
                            type="radio"
                            value="no" 
                            onChange={ (e) => this.updateInputState('hitTakeProfit', e.target.value) }
                      />
                      <label className="form-check-label" htmlFor="trade-htp-no">No</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="trade-exit-price">MFE</label>
                  <input id="trade-exit-price"
                        type="text"
                        className="form-control"
                        placeholder="MFE"
                        value={ this.state.trade.exitPrice ? this.state.trade.exitPrice.toString() : '' }
                        onChange={ (e) => this.updateInputState('exitPrice', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-fees">MAE</label>
                  <input id="trade-fees"
                        type="text"
                        className="form-control"
                        placeholder="MAE"
                        value={ this.state.trade.fees ? this.state.trade.fees.toString() : '' }
                        onChange={ (e) => this.updateInputState('fees', e.target.value) }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
  onFetchTrades: (journal: Types.Journal | string) => dispatch(fetchTrades(journal)),
  // @ts-ignore
  onRouteChange: (route: any) => dispatch(routeChange(route)),
});

export const Trade = connect(mapStateToProps, mapDispatchToProps)(TradePage);