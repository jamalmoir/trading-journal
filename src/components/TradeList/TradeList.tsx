import React from 'react';

import Types from 'Types';

import { TradeListItem } from '../TradeListItem';

import './tradeList.scss';


interface TradeListProps {
  className?: string;
  trades: Types.Trade[];
}

const buildRows = (trades: Types.Trade[]) => {
  let rows = [];

  let sortedTrades = trades.sort((a: Types.Trade, b: Types.Trade) => b.created.getTime() - a.created.getTime());

  for (let trade of sortedTrades) {
    rows.push(<TradeListItem key={ trade.id } trade={ trade } />)
  }

  return rows;
}

export const TradeList = (props: TradeListProps) => {
  return (
    <table className={ props.className + ' trade-list table table-striped table-bordered' }>
      <thead className={props.className + ' trade-list-item'}>
        <tr>
          <th className='trade-list-item-cell' scope='col'>Instrument</th>
          <th className='trade-list-item-cell' scope='col'>Strategy</th>
          <th className='trade-list-item-cell' scope='col'>Kind</th>
          <th className='trade-list-item-cell' scope='col'>Entry Date</th>
          <th className='trade-list-item-cell' scope='col'>Entry Price</th>
          <th className='trade-list-item-cell' scope='col'>Position Size</th>
          <th className='trade-list-item-cell' scope='col'>Stop Loss</th>
          <th className='trade-list-item-cell' scope='col'>Take Profit</th>
          <th className='trade-list-item-cell' scope='col'>Exit Date</th>
          <th className='trade-list-item-cell' scope='col'>Exit Price</th>
          <th className='trade-list-item-cell' scope='col'>P/L</th>
          <th className='trade-list-item-cell' scope='col'>Edit</th>
        </tr>
        {/*<TadeEditModal id='tradeEditModal' trade={ props.trade } />*/}
      </thead>
      <tbody>
        { buildRows(props.trades) }
      </tbody>
    </table>
  )
}