import React, { ChangeEvent, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import ReactTags, { Tag } from 'react-tag-autocomplete'
import { Dispatch } from 'redux'
import Types from 'Types'
import { Heading } from '../../components/Heading'
import { routeChange } from '../../redux/actions/app'
import { setActiveJournal } from '../../redux/actions/journal'
import { JournalAction } from '../../redux/reducers/journal'
import './trade.scss'
import { TextInput } from '../../components/TextInput'
import { TristateCheckbox } from '../../components/TristateCheckbox'
import { setUpControls, buildTrade } from '../../utils/utils'
import { inputControls } from './inputControls'
import { modifyTrade } from '../../redux/actions/trade'
import { Button } from '../../components/Button'
import { SelectInput } from '../../components/SelectInput'
import { DateInput } from '../../components/DateInput'
import { Sidebar } from '../../components/Sidebar'
import { Breadcrumbs } from '../../components/Breadcrumbs'

interface TradePageProps {
  trades: Types.Trade[]
  journals: Types.Journal[]
  activeJournal: Types.Journal
  match: match<{ journalId: string; tradeId: string }>
  onFetchTrades: (journal: Types.Journal | string) => null
  onRouteChange: (route: any) => null
  onModifyTrade: (trade: Types.Trade) => null
  onSetActiveJournal: (journal: Types.Journal) => null
  auth: any
}

const TradePage = (props: TradePageProps) => {
  const [trade, setTrade] = useState(null)
  const [controlsValid, setControlsValid] = useState(false)
	const [controls, setControls] = setUpControls(null)
	
	const kindChoices = [
		{ id: 'long', name: 'Long' },
		{ id: 'short', name: 'Short' },
	]

  props.onRouteChange(props.match)

  // Set current trade on page and use it to initialise input controls.
  useEffect(() => {
    if (props.trades.length) {
      let currentTrade = props.trades.find(
        t =>
          t.id === props.match.params.tradeId &&
          t.journalId === props.match.params.journalId
      )
      setTrade(currentTrade)
      if (controls === null) {
        let initialControls = inputControls
        Object.keys(initialControls).map(
          key => (initialControls[key].value = currentTrade[key])
        )
        setControls(null, initialControls)
      }
    }
  }, [props.trades])

  // Set the current journal on page load from the id in the URL.
  useEffect(() => {
    if (props.journals.length && props.activeJournal == null) {
      let journal = props.journals.find(
        j => j.id === props.match.params.journalId
      )
      props.onSetActiveJournal(journal)
    }
  }, [props.journals])

  const updateInputState = (key: string, value: any) => {
    value = key === 'flag' ? !controls.flag.value : value
    setControlsValid(setControls(key, value))
  }

  const handleTagDelete = (kind: string, i: number) => {
    let newTags = controls[kind].value.filter(
      (tag: Tag, index: number) => index !== i
    )
    setControls(kind, newTags)
  }

  const handleTagAddition = (kind: string, tag: Tag) => {
    let newTags = [...controls[kind].value, tag]
    setControls(kind, newTags)
  }

  const modifyTrade = () => {
    let values: { [key: string]: any } = {
      journal: props.activeJournal,
      ...trade,
    }
    Object.keys(controls).map(k => (values[k] = controls[k].value))
    props.onModifyTrade(buildTrade(values))
  }

  return controls === null ? (
    <div></div>
  ) : (
    <div className="trade">
      <Sidebar />
			<div className="content">
				<Breadcrumbs />
				<div className="trade-controls">
					<Heading
						text={
							props.activeJournal ? props.activeJournal.name : '' +
							' | ' +
							(controls.kind.value.charAt(0).toUpperCase() + trade.kind.slice(1)) +
							' ' +
							trade.instrument +
							' Trade'
						}
					/>
					<Button
						text="Submit"
						className="tqc-button"
						disabled={!controlsValid}
						onClick={modifyTrade}
					/>
				</div>
				<div className="trade-body grid-x grid-margin-x">
					<div className="trade-details trade-inputs card cell small medium-3">
						<h5 className="card-divider">Details</h5>
						<div className="card-section grid-x grid-margin-y">
							<TextInput
								className="cell"
								id="trade-instrument"
								type="text"
								label="Instrument"
								value={controls.instrument.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('instrument', e.target.value)
								}
								errors={controls.instrument.errors}
								touched={controls.instrument.touched}
							/>
							<TextInput
								className="cell"
								id="trade-strategy"
								type="text"
								label="Strategy"
								value={controls.strategy.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('strategy', e.target.value)
								}
								errors={controls.strategy.errors}
								touched={controls.strategy.touched}
							/>
							<SelectInput
								id="trade-kind"
								className="cell"
								value={controls.kind.value}
								choices={kindChoices}
								label="Kind"
								onChange={e => updateInputState('kind', e.target.value as 'live' | 'demo' | 'backtest')}
							/>
							<div className="form-check cell">
								<input
									id="trade-flag"
									type="checkbox"
									className="form-check-input"
									checked={controls.flag.value}
									onChange={e => updateInputState('flag', e.target.value)}
								/>
								<label htmlFor="trade-flag">Flag</label>
							</div>
							<div className="form-group cell">
								<label>Tags</label>
								<ReactTags
									tags={controls.tags.value}
									handleDelete={i => handleTagDelete('tags', i)}
									handleAddition={tag => handleTagAddition('tags', tag)}
									allowNew
								/>
							</div>
						</div>
					</div>

					<div className="trade-entry trade-inputs card cell small medium-3">
						<h5 className="card-divider">Entry</h5>
						<div className="card-section grid-x grid-margin-y">
							<DateInput
								className="cell"
								value={controls.entryDate.value}
								onChange={d => updateInputState('entryDate', d)}
								label="Entry Date"
							/>
							<TextInput
								id="trade-entry-price"
								className="cell"
								type="text"
								label="Entry Price"
								value={controls.entryPrice.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('entryPrice', e.target.value)
								}
								errors={controls.entryPrice.errors}
								touched={controls.entryPrice.touched}
							/>
							<TextInput
								id="trade-position-size"
								className="cell"
								type="text"
								label="Position Size"
								value={controls.positionSize.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('positionSize', e.target.value)
								}
								errors={controls.positionSize.errors}
								touched={controls.positionSize.touched}
							/>
							<TextInput
								id="trade-stop-loss"
								className="cell"
								type="text"
								label="Stop Loss"
								value={controls.stopLoss.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('stopLoss', e.target.value)
								}
								errors={controls.stopLoss.errors}
								touched={controls.stopLoss.touched}
							/>
							<TextInput
								id="trade-take-profit"
								className="cell"
								type="text"
								label="Take Profit"
								value={controls.takeProfit.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('takeProfit', e.target.value)
								}
								errors={controls.takeProfit.errors}
								touched={controls.takeProfit.touched}
							/>
							<div className="form-group cell">
								<label>Entry Emotion</label>
								<ReactTags
									tags={controls.entryEmotion.value}
									placeholder="Add Emotion"
									handleDelete={i => handleTagDelete('entryEmotion', i)}
									handleAddition={tag => handleTagAddition('entryEmotion', tag)}
									allowNew
								/>
							</div>
						</div>
					</div>

					<div className="trade-exit trade-inputs card cell small medium-3">
						<h5 className="card-divider">Exit</h5>
						<div className="card-section grid-x grid-margin-y">
							<DateInput
								className="trade-filter cell"
								value={controls.entryDate.value}
								onChange={d => updateInputState('exitDate', d)}
								label="Exit Date"
							/>
							<TextInput
								id="trade-exit-price"
								className="cell"
								type="text"
								label="Exit Price"
								value={controls.exitPrice.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('exitPrice', e.target.value)
								}
								errors={controls.exitPrice.errors}
								touched={controls.exitPrice.touched}
							/>
							<TextInput
								id="trade-fees"
								className="cell"
								type="text"
								label="Fees"
								value={controls.fees.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('fees', e.target.value)
								}
								errors={controls.fees.errors}
								touched={controls.fees.touched}
							/>
							<TextInput
								id="trade-pl"
								className="cell"
								type="text"
								label="P/L"
								value={controls.pl.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('pl', e.target.value)
								}
								errors={controls.pl.errors}
								touched={controls.pl.touched}
							/>
							<div className="form-group cell">
								<label>Rating</label>
								<div className="grid-x">
									<label
										className="form-check-label cell small medium-4"
										htmlFor="trade-rating-n1"
									>
										<input
											id="trade-rating-n1"
											className="form-check-input"
											type="radio"
											value="-1"
											onChange={e => updateInputState('rating', e.target.value)}
										/>
											-1
									</label>
									<label
										className="form-check-label cell small medium-4"
										htmlFor="trade-rating-0"
									>
										<input
											id="trade-rating-0"
											className="form-check-input"
											type="radio"
											value="0"
											onChange={e => updateInputState('rating', e.target.value)}
										/>
											0
									</label>
									<label
										className="form-check-label cell small medium-4"
										htmlFor="trade-rating-1"
									>
										<input
											id="trade-rating-1"
											className="form-check-input"
											type="radio"
											value="1"
											onChange={e => updateInputState('rating', e.target.value)}
										/>
											1
									</label>
								</div>
							</div>
							<div className="form-group cell">
								<label>Exit Emotion</label>
								<ReactTags
									tags={controls.exitEmotion.value}
									placeholder="Add Emotion"
									handleDelete={i => handleTagDelete('exitEmotion', i)}
									handleAddition={tag => handleTagAddition('exitEmotion', tag)}
									allowNew
								/>
							</div>
						</div>
					</div>

					<div className="trade-price trade-inputs card cell small medium-3">
						<h5 className="card-divider">Price Action</h5>
						<div className="card-section grid-x grid-margin-y">
							<div className="trade-filter form-check cell">
								<TristateCheckbox
									id="profit-tristate"
									className="form-check-input"
									onClick={(val: boolean | null) =>
										updateInputState('hitTakeProfit', val)
									}
								/>
								<label className="form-check-label" htmlFor="profit-tristate">
									Hit Take Profit
								</label>
							</div>
							<TextInput
								id="trade-exit-mfe"
								className="cell"
								type="text"
								label="MFE"
								value={controls.mfe.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('mfe', e.target.value)
								}
								errors={controls.mfe.errors}
								touched={controls.mfe.touched}
							/>
							<TextInput
								id="trade-mae"
								className="cell"
								type="text"
								label="MAE"
								value={controls.mae.value}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateInputState('mae', e.target.value)
								}
								errors={controls.mae.errors}
								touched={controls.mae.touched}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    trades: state.trade.trades,
    journals: state.journal.journals,
    activeJournal: state.journal.activeJournal,
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onRouteChange: (route: any) => dispatch(routeChange(route)),
  // @ts-ignore
  onModifyTrade: (trade: Types.Trade) => dispatch(modifyTrade(trade)),
  // @ts-ignore
  onSetActiveJournal: (journal: Types.Journal) =>
    dispatch(setActiveJournal(journal)),
})

export const Trade = connect(
  mapStateToProps,
  mapDispatchToProps
)(TradePage)
