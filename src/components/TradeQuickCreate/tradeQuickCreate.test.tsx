import * as React from 'react'
import { TradeQuickCreateComponent } from './TradeQuickCreate'
import { shallow } from 'enzyme'
import { testJournals } from '../../utils/testHelpers'
import { buildTrade } from '../../utils/utils'

describe('<TradeQuickCreate />', () => {
  const journals = testJournals()
  const journal = journals[0]
  const auth = {}
  const onCreateTrade = jest.fn()

  it('matches snapshot', () => {
    const component = shallow(
      <TradeQuickCreateComponent
        journal={journal}
        auth={auth}
        activeJournal={journal}
        onCreateTrade={onCreateTrade}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it('handles calling onCreateTrade with the right arguments', () => {
    const component = shallow(
      <TradeQuickCreateComponent
        journal={journal}
        auth={auth}
        activeJournal={journal}
        onCreateTrade={onCreateTrade}
      />
    )
    const instrument = 'USDJPY'
    const strategy = 'Cypher'
    const kind = 'long'
    // const entryDate = new Date();
    const entryPrice = '1000'
    const positionSize = '1000'
    const stopLoss = '999'
    const takeProfit = '1002'

    component
      .find('.tqc-instrument')
      .simulate('change', { target: { value: instrument } })
    component
      .find('.tqc-strategy')
      .simulate('change', { target: { value: strategy } })
    component.find('.tqc-kind').simulate('change', { target: { value: kind } })
    // component.find('.tqc-entry-date').simulate('change', { target: { value: entryDate } });
    component
      .find('.tqc-entry-price')
      .simulate('change', { target: { value: entryPrice } })
    component
      .find('.tqc-size')
      .simulate('change', { target: { value: positionSize } })
    component
      .find('.tqc-stop-loss')
      .simulate('change', { target: { value: stopLoss } })
    component
      .find('.tqc-take-profit')
      .simulate('change', { target: { value: takeProfit } })
    component.find('button').simulate('click')

    const expectedTrade = buildTrade({
      journal: journal,
      instrument: instrument,
      strategy: strategy,
      kind: kind,
      // entryDate: entryDate,
      entryPrice: entryPrice,
      positionSize: positionSize,
      stopLoss: stopLoss,
      takeProfit: takeProfit,
    })

    expect(
      JSON.stringify(onCreateTrade.mock.calls[0][0]) ===
        JSON.stringify(expectedTrade)
    ).toBeTruthy()
  })
})
