import * as React from 'react'

import Types from 'Types'

import './tradeListItem.scss'
import { Link } from 'react-router-dom'

interface TradeListProps {
  className?: string
  trade: Types.Trade
}

export const TradeListItem = (props: TradeListProps) => {
  return (
    <tr className={props.className + ' trade-list-item'}>
      <td className={'trade-list-item-cell'}>{props.trade.instrument}</td>
      <td className={'trade-list-item-cell'}>{props.trade.strategy}</td>
      <td className={'trade-list-item-cell'}>{props.trade.kind}</td>
      <td className={'trade-list-item-cell'}>
        {props.trade.entryDate.toLocaleDateString()}
      </td>
      <td className={'trade-list-item-cell'}>
        {props.trade.entryPrice.toString()}
      </td>
      <td className={'trade-list-item-cell'}>
        {props.trade.positionSize.toString()}
      </td>
      <td className={'trade-list-item-cell'}>
        {props.trade.stopLoss.toString()}
      </td>
      <td className={'trade-list-item-cell'}>
        {props.trade.takeProfit.toString()}
      </td>
      <td className={'trade-list-item-cell'}>
        {props.trade.pl ? props.trade.exitDate.toLocaleDateString() : ''}
      </td>
      <td className={'trade-list-item-cell'}>
        {props.trade.exitPrice ? props.trade.exitPrice.toString() : ''}
      </td>
      <td className={'trade-list-item-cell'}>
        {props.trade.pl ? props.trade.pl.toString() : ''}
      </td>
      <td className={'trade-list-item-cell'}>
        <Link to={props.trade.journalId + '/trade/' + props.trade.id}>
          <i
            className="trade-list-item-edit far fa-edit"
            data-toggle="modal"
            data-target="#journalEditModal"
          ></i>
        </Link>
      </td>
    </tr>
  )
}
