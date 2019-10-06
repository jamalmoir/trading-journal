import * as React from 'react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import { createTrade } from '../../redux/actions/trade'
import './tradeQuickCreate.scss'
import { TextInput } from '../TextInput'
import { buildTrade, setUpControls } from '../../utils/utils'
import { inputControls } from './inputControls'

interface TradeQuickCreateProps {
  className?: string
  journal: Types.Journal
  auth: any
  activeJournal: Types.Journal
  onCreateTrade: (trade: Types.Trade) => null
}

export const TradeQuickCreateComponent = (props: TradeQuickCreateProps) => {
  const [controlsValid, setControlsValid] = useState(false)
  const [controls, setControls] = setUpControls(inputControls)

  const updateInputState = (key: string, val: string | Date) =>
    setControlsValid(setControls(key, val))

  const createTrade = () => {
    let values: { [key: string]: any } = { journal: props.activeJournal }
    Object.keys(controls).map(k => (values[k] = controls[k].value))
    let trade = buildTrade({ journal: props.journal, ...values })
    props.onCreateTrade(trade)
    setControls(null, inputControls)
  }

  return (
    <div className="trade-quick-create container">
      <div className="input-group mb-3">
        <TextInput
          type="text"
          className="form-control col-sm-2 tqc-instrument"
          label="Instrument"
          value={controls.instrument.value}
          onChange={e => updateInputState('instrument', e.target.value)}
          errors={controls.instrument.errors}
          touched={controls.instrument.touched}
        />
        <TextInput
          type="text"
          className="form-control col-sm-2 tqc-strategy"
          label="Strategy"
          value={controls.strategy.value}
          onChange={e => updateInputState('strategy', e.target.value)}
          errors={controls.strategy.errors}
          touched={controls.strategy.touched}
        />
        <select
          className="custom-select col-sm-1 tqc-kind"
          value={controls.kind.value}
          onChange={e =>
            updateInputState('kind', e.target.value as
              | 'live'
              | 'demo'
              | 'backtest')
          }
        >
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
        <div className="trade-quick-create-date form-control col-sm-2">
          <DatePicker
            className={'tqc-entry-date'}
            selected={controls.entryDate.value}
            onChange={d => updateInputState('entryDate', d)}
            placeholderText="Entry Date"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <TextInput
          type="text"
          className="form-control col-sm-1 tqc-entry-price"
          label="Entry Price"
          value={
            controls.entryPrice.value
              ? controls.entryPrice.value.toString()
              : undefined
          }
          onChange={e => updateInputState('entryPrice', e.target.value)}
          errors={controls.entryPrice.errors}
          touched={controls.entryPrice.touched}
        />
        <TextInput
          type="text"
          className="form-control col-sm-1 tqc-size"
          label="Size"
          value={
            controls.positionSize.value
              ? controls.positionSize.value.toString()
              : undefined
          }
          onChange={e => updateInputState('positionSize', e.target.value)}
          errors={controls.positionSize.errors}
          touched={controls.positionSize.touched}
        />
        <TextInput
          type="text"
          className="form-control col-sm-1 tqc-stop-loss"
          label="Stop Loss"
          value={
            controls.stopLoss.value
              ? controls.stopLoss.value.toString()
              : undefined
          }
          onChange={e => updateInputState('stopLoss', e.target.value)}
          errors={controls.stopLoss.errors}
          touched={controls.stopLoss.touched}
        />
        <TextInput
          type="text"
          className="form-control col-sm-1 tqc-take-profit"
          label="Take Profit"
          value={
            controls.takeProfit.value
              ? controls.takeProfit.value.toString()
              : undefined
          }
          onChange={e => updateInputState('takeProfit', e.target.value)}
          errors={controls.takeProfit.errors}
          touched={controls.takeProfit.touched}
        />
        <button
          className="btn btn-outline-primary trade-quick-create-button form-control col-sm-1"
          type="button"
          disabled={!controlsValid}
          onClick={createTrade}
        >
          Create
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    auth: state.firebase.auth,
    activeJournal: state.journal.activeJournal,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  // @ts-ignore
  onCreateTrade: (trade: Types.Trade) => dispatch(createTrade(trade)),
})

export const TradeQuickCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeQuickCreateComponent)
