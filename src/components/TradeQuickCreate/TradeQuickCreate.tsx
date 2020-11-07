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
import { SelectInput } from '../SelectInput'
import { Button } from '../Button'
import { TradeState } from '../../redux/reducers/trade'
import { DateInput } from '../DateInput/DateInput'

interface TradeQuickCreateProps {
  className?: string
  journal: Types.Journal
  auth: any
  activeJournal: Types.Journal
  trade?: TradeState // TODO: Not optional
  onCreateTrade: (trade: Types.Trade) => null
}

const kindChoices = [
  { id: 'long', name: 'Long' },
  { id: 'short', name: 'Short' },
]

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
    <div className="trade-quick-create grid-x">
      <TextInput
        type="text"
        className="cell small medium-2 tqc-instrument"
        label="Instrument"
        value={controls.instrument.value}
        onChange={e => updateInputState('instrument', e.target.value)}
        errors={controls.instrument.errors}
        touched={controls.instrument.touched}
      />
      <TextInput
        type="text"
        className="cell small medium-2 tqc-strategy"
        label="Strategy"
        value={controls.strategy.value}
        onChange={e => updateInputState('strategy', e.target.value)}
        errors={controls.strategy.errors}
        touched={controls.strategy.touched}
      />
      <SelectInput
        className="cell small medium-1 tqc-kind"
        value={controls.kind.value}
        choices={kindChoices}
        label="Kind"
        onChange={e =>
          updateInputState('kind', e.target.value as
            | 'live'
            | 'demo'
            | 'backtest')
        }
      />
      <DateInput
        className="tqc-entry-date cell small medium-2"
        value={controls.entryDate.value}
        onChange={d => updateInputState('entryDate', d)}
        label="Entry Date"
      />
      <TextInput
        type="text"
        className="cell small medium-1 tqc-entry-price"
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
        className="cell small medium-1 tqc-size"
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
        className="cell small medium-1 tqc-stop-loss"
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
        className="cell small medium-1 tqc-take-profit"
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
      <Button
        className="tqc-button cell small medium-1"
        text="Create"
        disabled={!controlsValid}
        loading={props.trade.isRequesting}
        onClick={createTrade}
      />
    </div>
  )
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    auth: state.firebase.auth,
    activeJournal: state.journal.activeJournal,
    trade: state.trade,
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
