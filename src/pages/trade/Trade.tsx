import React, { ChangeEvent, useState, useEffect } from 'react';
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
import './trade.scss';
import { TextInput } from '../../components/TextInput';
import { TristateCheckbox } from '../../components/TristateCheckbox';
import { setUpControls, buildTrade, controlsValid } from '../../utils/utils';
import { inputControls } from './inputControls';


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
	const [trade, setTrade] = useState(null);
	const [controlsValid, setControlsValid] = useState(false);
	const [controls, setControls] = setUpControls(null);

	props.onRouteChange(props.match);

	// Set current trade on page and use it to initialise input controls.
	useEffect(() => {
		if (props.trades.length) {
			let currentTrade = props.trades.find(t => t.id === props.match.params.tradeId &&
																					 t.journalId === props.match.params.journalId);
			setTrade(currentTrade);
			if (controls === null) {
				let initialControls = inputControls;
				Object.keys(initialControls).map(key => initialControls[key].value = currentTrade[key]);
				setControls(null, initialControls);
			}
		}
	}, [props.trades])

	// Set the current journal on page load from the id in the URL.
	useEffect(() => {
		if (props.journals.length && props.activeJournal == null) {
			let journal = props.journals.find(j => j.id === props.match.params.journalId);
			props.onSetActiveJournal(journal);
		}
	}, [props.journals])

	const updateInputState = (key: string, value: any) => setControlsValid(setControls(key, value));

	const handleTagDelete = (kind: string, i: number) => {
		let newTags = controls[kind].value.filter((tag: Tag, index:number) => index !== i);
		setControls(kind, newTags);
	}

	const handleTagAddition = (kind: string, tag: Tag) => {
		let newTags = [...controls[kind].value, tag]
		setControls(kind, newTags);
	}

	const modifyTrade = () => {
		let values: {[key: string]: any} = {journal: props.activeJournal, ...trade};
		Object.keys(controls).map(k => values[k] = controls[k].value)
		props.onModifyTrade(buildTrade(values));
	}

	return controls === null
	? <div></div>
	:(
		<div className='trade'>
			<Heading text={ props.activeJournal.name + " | " + (controls.kind.value.charAt(0).toUpperCase() + trade.kind.slice(1)) + " " + trade.instrument + " Trade" } />
			<div className='trade-controls'>
				<button className="btn btn-outline-primary trade-quick-create-button form-control col-sm-1"
								type="button"
								disabled={ !controlsValid }
								onClick={ modifyTrade }>
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
											errors={ controls.instrument.errors }
											touched={ controls.instrument.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-strategy">Strategy</label>
								<TextInput id="trade-strategy"
											type="text"
											placeholder="Strategy"
											value={ controls.strategy.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('strategy', e.target.value) }
											errors={ controls.strategy.errors }
											touched={ controls.strategy.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-kind">Kind</label>
									<select id="trade-kind"
													className="custom-select"
													value={ controls.kind.value }
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
											checked={ controls.flag.value }
											onChange={ (e) => updateInputState('flag', e.target.value) }
								/>
								<label htmlFor="trade-flag">Flag</label>
							</div>
							<div className="form-group">
								<label>Tags</label>
								<ReactTags tags={ controls.tags.value }
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
										selected={ controls.entryDate.value }
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
											errors={ controls.entryPrice.errors }
											touched={ controls.entryPrice.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-position-size">Position Size</label>
								<TextInput id="trade-position-size"
											type="text"
											placeholder="Position Size"
											value={ controls.positionSize.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('positionSize', e.target.value) }
											errors={ controls.positionSize.errors }
											touched={ controls.positionSize.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-stop-loss">Stop Loss</label>
								<TextInput id="trade-stop-loss"
											type="text"
											placeholder="Stop Loss"
											value={ controls.stopLoss.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('stopLoss', e.target.value) }
											errors={ controls.stopLoss.errors }
											touched={ controls.stopLoss.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-take-profit">Take Profit</label>
								<TextInput id="trade-take-profit"
											type="text"
											placeholder="Take Profit"
											value={ controls.takeProfit.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('takeProfit', e.target.value) }
											errors={ controls.takeProfit.errors }
											touched={ controls.takeProfit.touched }
								/>
							</div>
							<div className="form-group">
								<label>Entry Emotion</label>
								<ReactTags tags={ controls.entryEmotion.value }
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
										selected={ controls.exitDate.value }
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
											value={ controls.exitPrice.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('exitPrice', e.target.value) }
											errors={ controls.exitPrice.errors }
											touched={ controls.exitPrice.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-fees">Fees</label>
								<TextInput id="trade-fees"
											type="text"
											placeholder="Fees"
											value={ controls.fees.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('fees', e.target.value) }
											errors={ controls.fees.errors }
											touched={ controls.fees.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-pl">P/L</label>
								<TextInput id="trade-pl"
											type="text"
											placeholder="P/L"
											value={ controls.pl.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('pl', e.target.value) }
											errors={ controls.pl.errors }
											touched={ controls.pl.touched }
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
								<ReactTags tags={ controls.exitEmotion.value }
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
											value={ controls.mfe.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('mfe', e.target.value) }
											errors={ controls.mfe.errors }
											touched={ controls.mfe.touched }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="trade-mae">MAE</label>
								<TextInput id="trade-mae"
											type="text"
											placeholder="MAE"
											value={ controls.mae.value }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => updateInputState('mae', e.target.value) }
											errors={ controls.mae.errors }
											touched={ controls.mae.touched }
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