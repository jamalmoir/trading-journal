import React from 'react';

import Types from 'Types';

import './tradeListItem.scss';
//import { TradeEditModal } from '../TradeEditModal';


interface TradeListProps {
  className?: string;
  trade: Types.Trade;
}

export const TradeListItem = (props: TradeListProps) => {
  return (
    <tr className={props.className + ' trade-list-item'}>
      <td className={'trade-list-item-cell'}>{ props.trade.instrument }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.strategy }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.kind }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.entryDate.toLocaleDateString() }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.entryPrice.toString() }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.positionSize.toString() }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.stopLoss.toString() }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.takeProfit.toString() }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.exitDate.toLocaleDateString() }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.exitPrice.toString() }</td>
      <td className={'trade-list-item-cell'}>{ props.trade.pl.toString() }</td>
      <td className={'trade-list-item-cell'}>
        <i className="trade-list-item-edit far fa-edit" data-toggle="modal" data-target="#journalEditModal"></i>
      </td>
      {/*<TadeEditModal id='tradeEditModal' trade={ props.trade } />*/}
    </tr>
  )
}