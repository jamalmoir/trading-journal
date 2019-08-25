import Big from 'big.js';
import React, { Component, ChangeEvent, useState, useEffect } from 'react';
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
import { TristateCheckbox } from '../../components/TristateCheckbox';
import { setUpControls } from '../../utils/utils';


interface TradePageProps {
  trades: Types.Trade[];
  journals: Types.Journal[];
  activeJournal: Types.Journal;
  match: match<{ journalId: string, tradeId: string }>;
  onFetchTrades: (journal: Types.Journal | string) => null;
  onRouteChange: (route: any) => null;
  onModifyTrade: (trade: Types.Trade) => null;
  onSetActiveJournal: (journal: Types.Journal) => null;
  auth: any;
}


const TradePage = (props: TradePageProps) => {
  const [trade, setTrade]: [Types.Trade, (trade: Types.Trade) => void] = useState(null);
  const [controls, setControls] = setUpControls(null);

  props.onRouteChange(props.match);

  useEffect(() => {
    if (props.trades.length) {
      let currentTrade = props.trades.find(t => t.id === props.match.params.tradeId &&
                                           t.journalId === props.match.params.journalId);
      
      setTrade(currentTrade);

      if (controls === null) {

        let initialControls: Types.InputControls = {
          instrument: {
            value: currentTrade.instrument,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          strategy: {
            value: currentTrade.strategy,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          entryPrice: {
            value: currentTrade.entryPrice ? currentTrade.entryPrice.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          positionSize: {
            value: currentTrade.positionSize ? currentTrade.positionSize.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          stopLoss: {
            value: currentTrade.stopLoss ? currentTrade.stopLoss.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          takeProfit: {
            value: currentTrade.takeProfit ? currentTrade.takeProfit.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          exitPrice: {
            value: currentTrade.exitPrice ? currentTrade.exitPrice.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          fees: {
            value: currentTrade.fees ? currentTrade.fees.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          pl: {
            value: currentTrade.pl ? currentTrade.pl.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          mfe: {
            value: currentTrade.mfe ? currentTrade.mfe.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
          mae: {
            value: currentTrade.mae ? currentTrade.mae.toString() : null,
            errors: [],
            touched: false,
            validationRules: {
              minLength: 2,
            }
          },
        }

        setControls(null, initialControls);
      }
    }
  }, [props.trades])

  useEffect(() => {
    if (props.journals.length && props.activeJournal == null) {
      let journal = props.journals.find(j => j.id === props.match.params.journalId);
      props.onSetActiveJournal(journal);
    }
  }, [props.journals])

  const updateInputState = (key: string, value: any) => setControls(key, value);

  const handleTagDelete = (kind: string, i: number) => {
    let newTrade = {
      ...trade,
      [kind]: trade[kind].filter((tag: Tag, index:number) => index !== i),
    }

    setTrade(newTrade);
  }

  const handleTagAddition = (kind: string, tag: Tag) => {
    let newTrade = {
      ...trade,
      [kind]: [...trade[kind], tag]
    }

    setTrade(newTrade);
  }

  const modifyTrade = () => {
    const moneyValues = ['pl', 'fees'];
    const bigValues = ['entryPrice', 'positionSize', 'stopLoss', 'takeProfit', 'exitPrice', 'mfe', 'mae'];

    for(const key of Object.keys(trade)) {
      let val = trade[key];

      if (typeof val === 'undefined' || val === '') {
        trade[key] = null;
      } else if (moneyValues.includes(key) && typeof val === 'string') {
        trade[key] = new Money(val, props.activeJournal.currency);
      } else if (bigValues.includes(key) && typeof val === 'string') {
        trade[key] = Number.isNaN(Number(val)) ? val : new Big(val);
      }
    }

    props.onModifyTrade(trade);
  }

  return trade === null || controls === null
  ? <div></div>
  :(
    <div className='trade'>
      <Heading text={ props.activeJournal.name + " | " + (trade.kind.charAt(0).toUpperCase() + trade.kind.slice(1)) + " " + trade.instrument + " Trade" } />
      <div className='trade-controls'>
        <button className="btn btn-outline-primary trade-quick-create-button form-control col-sm-1" type="button" onClick={ modifyTrade }>
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
                      value={ controls.instrument.value }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('instrument', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-strategy">Strategy</label>
                <TextInput id="trade-strategy"
                      type="text"
                      placeholder="Strategy"
                      value={ controls.strategy.value }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('strategy', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-kind">Kind</label>
                  <select className="custom-select col-sm-1"
                          value={ trade.kind }
                          onChange={ (e) => updateInputState('kind', e.target.value as 'live' | 'demo' | 'backtest') }
                  >
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                  </select>
              </div>
              <div className="form-check">
                <input id="trade-flag"
                      type="checkbox"
                      className="form-check-input"
                      placeholder="Kind"
                      checked={ trade.flag }
                      onChange={ (e) => updateInputState('flag', e.target.value) }
                />
                <label htmlFor="trade-flag">Flag</label>
              </div>
              <div className="form-group">
                <label>Tags</label>
                <ReactTags tags={ trade.tags }
                          handleDelete={ (i) => handleTagDelete('tags', i) }
                          handleAddition={ (tag) => handleTagAddition('tags', tag) } 
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
                    selected={ trade.entryDate }
                    onChange={ (d) => updateInputState('entryDate', d)}
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
                      value={ controls.entryPrice.value }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('entryPrice', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-position-size">Position Size</label>
                <TextInput id="trade-position-size"
                      type="text"
                      placeholder="Position Size"
                      value={ trade.positionSize ? trade.positionSize.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('positionSize', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-stop-loss">Stop Loss</label>
                <TextInput id="trade-stop-loss"
                      type="text"
                      placeholder="Stop Loss"
                      value={ trade.stopLoss ? trade.stopLoss.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('stopLoss', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-take-profit">Take Profit</label>
                <TextInput id="trade-take-profit"
                      type="text"
                      placeholder="Take Profit"
                      value={ trade.takeProfit ? trade.takeProfit.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('takeProfit', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label>Entry Emotion</label>
                <ReactTags tags={ trade.entryEmotion }
                          placeholder='Add Emotion'
                          handleDelete={ (i) => handleTagDelete('entryEmotion', i) }
                          handleAddition={ (tag) => handleTagAddition('entryEmotion', tag) } 
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
                    selected={ trade.exitDate }
                    onChange={ (d) => updateInputState('exitDate', d)}
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
                      value={ trade.exitPrice ? trade.exitPrice.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('exitPrice', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-fees">Fees</label>
                <TextInput id="trade-fees"
                      type="text"
                      placeholder="Fees"
                      value={ trade.fees ? trade.fees.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('fees', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-pl">P/L</label>
                <TextInput id="trade-pl"
                      type="text"
                      placeholder="P/L"
                      value={ trade.pl ? trade.pl.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('pl', e.target.value) }
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
                          onChange={ (e) => updateInputState('rating', e.target.value) }
                    />
                    <label className="form-check-label" htmlFor="trade-rating-n1">-1</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input id="trade-rating-0"
                          className="form-check-input"
                          type="radio"
                          value="0" 
                          onChange={ (e) => updateInputState('rating', e.target.value) }
                    />
                    <label className="form-check-label" htmlFor="trade-rating-0">0</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input id="trade-rating-1"
                          className="form-check-input"
                          type="radio"
                          value="1" 
                          onChange={ (e) => updateInputState('rating', e.target.value) }
                    />
                    <label className="form-check-label" htmlFor="trade-rating-1">1</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Exit Emotion</label>
                <ReactTags tags={ trade.exitEmotion }
                          placeholder='Add Emotion'
                          handleDelete={ (i) => handleTagDelete('exitEmotion', i) }
                          handleAddition={ (tag) => handleTagAddition('exitEmotion', tag) } 
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
                <div className="trade-filter form-check">
                  <TristateCheckbox id='profit-tristate'
                                    className="form-check-input"
                                    onClick={ (val: boolean | null) => updateInputState('hitTakeProfit', val) } />
                  <label className="form-check-label" htmlFor="profit-tristate">Hit Take Profit</label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="trade-exit-mfe">MFE</label>
                <TextInput id="trade-exit-mfe"
                      type="text"
                      placeholder="MFE"
                      value={ trade.mfe ? trade.mfe.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('mfe', e.target.value) }
                />
              </div>
              <div className="form-group">
                <label htmlFor="trade-mae">MAE</label>
                <TextInput id="trade-mae"
                      type="text"
                      placeholder="MAE"
                      value={ trade.mae ? trade.mae.toString() : '' }
                      onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('mae', e.target.value) }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    trades: state.journal.trades,
    journals: state.journal.journals,
    activeJournal: state.journal.activeJournal,
    auth: state.auth,
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