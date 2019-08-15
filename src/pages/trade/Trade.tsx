import Big from 'big.js';
import React, { Component, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { match } from 'react-router';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import { Dispatch } from 'redux';
import Types from 'Types';
import { Heading } from '../../components/Heading';
import { routeChange } from '../../redux/actions/app';
import { modifyTrade, setActiveJournal } from '../../redux/actions/journal';
import { JournalAction } from '../../redux/reducers/journal';
import { Money } from '../../utils/moolah';
import './trade.scss';
import { TextInput } from '../../components/TextInput';


interface TradePageProps {
  trades: Types.Trade[];
  journals: Types.Journal[];
  activeJournal: Types.Journal;
  match: match<{ journalId: string, tradeId: string }>;
  onFetchTrades: (journal: Types.Journal | string) => null;
  onRouteChange: (route: any) => null;
  onModifyTrade: (trade: Types.Trade) => null;
  onSetActiveJournal: (journal: Types.Journal) => null;
}

interface TradePageState {
  [index: string]: any;
  trade: Types.Trade;
  tags: {
    tags: Tag[],
    suggestions: Tag[],
  };
  emotions: {
    entryTags: Tag[],
    exitTags: Tag[],
    suggestions: Tag[],
  };
  auth: any;
}

class TradePage extends Component<TradePageProps, TradePageState> {
  constructor(props: TradePageProps) {
    super(props);

    this.state = {
      trade: null,
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

      this.setState((prevState: TradePageState) => {
        return {
          ...prevState,
          trade: {...trade},
        }
      })
    } 
  }

  componentDidUpdate(prevProps: TradePageProps) {
    if (prevProps.journals.length !== this.props.journals.length
        && this.props.journals.length
        && this.props.activeJournal == null) {
      let journal = this.props.journals.find(j => j.id === this.props.match.params.journalId);
      this.props.onSetActiveJournal(journal);
    }

    if (this.props.trades.length !== prevProps.trades.length) {
      let trade = this.props.trades.find(t => t.id === this.props.match.params.tradeId &&
                                              t.journalId === this.props.match.params.journalId);

      this.setState((prevState: TradePageState) => {
        return {
          ...prevState,
          trade: {...trade},
        }
      })
    }
  }

  updateInputState = (key: string, val: string | Date | boolean) => {
    let processedVal: string | Money | Date | Big | boolean;
    const moneyValues = ['pl', 'fees'];
    const bigValues = ['entryPrice', 'positionSize', 'stopLoss', 'takeProfit', 'exitPrice', 'mfe', 'mae'];

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
        trade: {
          ...prevState.trade,
          [key]: processedVal,
        }
      }
    })
  }

  handleTagDelete = (kind: string, i: number) => {
    let stateKey: string, tagsKey: string;

    if (kind === 'tags') {
      stateKey = 'tags';
      tagsKey = 'tags';
    } else if (kind === 'entryEmotion') {
      stateKey = 'emotions';
      tagsKey = 'entryTags';
    } else if (kind === 'exitEmotion') {
      stateKey = 'emotions';
      tagsKey = 'exitTags';
    }

    this.setState((prevState: TradePageState) => {
      return {
        ...prevState,
        [stateKey]: {
          ...prevState.tags,
          [tagsKey]: prevState[stateKey][tagsKey].filter((tag: Tag, index:number) => index !== i),
        },
        trade: {
          ...prevState.trade,
          [kind]: prevState.trade[kind].filter((tag: string, index: number) => index !== i),
        }
      }
    });
  }

  handleTagAddition = (kind: string, tag: Tag) => {
    let stateKey: string, tagsKey: string;

    if (kind === 'tags') {
      stateKey = 'tags';
      tagsKey = 'tags';
    } else if (kind === 'entryEmotion') {
      stateKey = 'emotions';
      tagsKey = 'entryTags';
    } else if (kind === 'exitEmotion') {
      stateKey = 'emotions';
      tagsKey = 'exitTags';
    } else {
      return
    }

    this.setState((prevState: TradePageState) => {
      return {
        ...prevState,
        [stateKey]: {
          ...prevState[stateKey],
          [tagsKey]: [...prevState[stateKey][tagsKey], tag]
        },
        trade: {
          ...prevState.trade,
          [kind]: [...prevState.trade[kind], tag.name]
        }
      }
    })
  }

  modifyTrade = () => {
    for(const key of Object.keys(this.state.trade)) {
      typeof this.state.trade[key] === 'undefined' ? null : this.state.trade[key];
    }

    this.props.onModifyTrade(this.state.trade);
  }

  render() {
    
    return !this.state.trade
    ? <div></div>
    :(
      <div className='trade'>
        <Heading text={ this.props.activeJournal.name + " | " + (this.state.trade.kind.charAt(0).toUpperCase() + this.state.trade.kind.slice(1)) + " " + this.state.trade.instrument + " Trade" } />
        <div className='trade-controls'>
          <button className="btn btn-outline-primary trade-quick-create-button form-control col-sm-1" type="button" onClick={ this.modifyTrade }>
            Submit
          </button>
        </div>
        <div className="trade-body row">
          <div className='trade-details trade-inputs col-sm-3'>
            <div className="card">
              <h5 className="card-header">Details</h5>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="trade-instrument">Instrument</label>
                  <TextInput id="trade-instrument"
                        type="text"
                        placeholder="Instrument"
                        value={ this.state.trade.instrument }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('instrument', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-strategy">Strategy</label>
                  <TextInput id="trade-strategy"
                        type="text"
                        placeholder="Strategy"
                        value={ this.state.trade.strategy }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('strategy', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-kind">Kind</label>
                  <TextInput id="trade-kind"
                        type="text"
                        placeholder="Kind"
                        value={ this.state.trade.kind }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('kind', e.target.value) }
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
                            handleDelete={ (i) => this.handleTagDelete('tags', i) }
                            handleAddition={ (tag) => this.handleTagAddition('tags', tag) } 
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
                  <TextInput id="trade-entry-price"
                        type="text"
                        placeholder="Entry Price"
                        value={ this.state.trade.entryPrice ? this.state.trade.entryPrice.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('entryPrice', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-position-size">Position Size</label>
                  <TextInput id="trade-position-size"
                        type="text"
                        placeholder="Position Size"
                        value={ this.state.trade.positionSize ? this.state.trade.positionSize.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('positionSize', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-stop-loss">Stop Loss</label>
                  <TextInput id="trade-stop-loss"
                        type="text"
                        placeholder="Stop Loss"
                        value={ this.state.trade.stopLoss ? this.state.trade.stopLoss.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('stopLoss', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-take-profit">Take Profit</label>
                  <TextInput id="trade-take-profit"
                        type="text"
                        placeholder="Take Profit"
                        value={ this.state.trade.takeProfit ? this.state.trade.takeProfit.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('takeProfit', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label>Entry Emotion</label>
                  <ReactTags tags={ this.state.emotions.entryTags }
                            suggestions={ this.state.emotions.suggestions }
                            placeholder='Add Emotion'
                            handleDelete={ (i) => this.handleTagDelete('entryEmotion', i) }
                            handleAddition={ (tag) => this.handleTagAddition('entryEmotion', tag) } 
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
                  <TextInput id="trade-exit-price"
                        type="text"
                        placeholder="Exit Price"
                        value={ this.state.trade.exitPrice ? this.state.trade.exitPrice.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('exitPrice', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-fees">Fees</label>
                  <TextInput id="trade-fees"
                        type="text"
                        placeholder="Fees"
                        value={ this.state.trade.fees ? this.state.trade.fees.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('fees', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-pl">P/L</label>
                  <TextInput id="trade-pl"
                        type="text"
                        placeholder="P/L"
                        value={ this.state.trade.pl ? this.state.trade.pl.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('pl', e.target.value) }
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
                            handleDelete={ (i) => this.handleTagDelete('exitEmotion', i) }
                            handleAddition={ (tag) => this.handleTagAddition('exitEmotion', tag) } 
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
                  <label htmlFor="trade-exit-mfe">MFE</label>
                  <TextInput id="trade-exit-mfe"
                        type="text"
                        placeholder="MFE"
                        value={ this.state.trade.mfe ? this.state.trade.mfe.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('mfe', e.target.value) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trade-mae">MAE</label>
                  <TextInput id="trade-mae"
                        type="text"
                        placeholder="MAE"
                        value={ this.state.trade.mae ? this.state.trade.mae.toString() : '' }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => this.updateInputState('mae', e.target.value) }
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
    activeJournal: state.journal.activeJournal,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onRouteChange: (route: any) => dispatch(routeChange(route)),
  // @ts-ignore
  onModifyTrade: (trade: Types.Trade) => dispatch(modifyTrade(trade)),
  // @ts-ignore
  onSetActiveJournal: (journal: Types.Journal) => dispatch(setActiveJournal(journal)),
});

export const Trade = connect(mapStateToProps, mapDispatchToProps)(TradePage);