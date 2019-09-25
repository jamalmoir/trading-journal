import { firestore } from 'firebase';
import { getFirebase } from 'react-redux-firebase';
import { Dispatch } from 'redux';
import { getFirestore } from 'redux-firestore';
import Types from 'Types';
import { action } from 'typesafe-actions';
import { Money } from '../../utils/moolah';
import { CLEAR_TRADES, CREATE_TRADE_FAILURE, CREATE_TRADE_REQUEST, CREATE_TRADE_SUCCESS, FETCH_TRADES_FAILURE, FETCH_TRADES_REQUEST, FETCH_TRADES_SUCCESS, MODIFY_TRADE_FAILURE, MODIFY_TRADE_REQUEST, MODIFY_TRADE_SUCCESS, SET_TRADE_FILTERS, DELETE_TRADE_REQUEST, DELETE_TRADE_SUCCESS, DELETE_TRADE_FAILURE } from './actionTypes';


type Extras = {
  getFirebase: typeof getFirebase,
  getFirestore: typeof getFirestore,
};

const extractTrades = (snapshot: firestore.QuerySnapshot): Types.Trade[] => {
  let trades: Types.Trade[] = [];

  snapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
    let data = doc.data();

    let trade: Types.Trade = {
      id: doc.id,
      journalId: data.journalId,
      created: new Date(data.created.seconds * 1000),
      modified: new Date(data.modified.seconds * 1000),
      instrument: data.instrument,
      strategy: data.strategy,
      kind: data.kind,
      entryDate: new Date(data.entryDate.seconds * 1000),
      entryPrice: data.entryPrice,
      positionSize: data.positionSize,
      stopLoss: data.stopLoss,
      takeProfit: data.takeProfit,
      exitDate: data.exitDate ? new Date(data.exitDate.seconds * 1000) : null,
      exitPrice: data.exitPrice,
      fees: data.fees ? new Money(data.fees.amount, data.fees.currency.decimals ? data.fees.currency.code : data.fees.currency) : null,
      pl: data.pl? new Money(data.pl.amount, data.pl.currency.decimals ? data.pl.currency.code : data.pl.currency) : null,
      hitTakeProfit: data.hitTakeProfit,
      mfe: data.mfe || null,
      mae: data.message || null,
      tags: data.tags,
      entryComment: data.entryComment,
      duringComment: data.duringComment,
      exitComment: data.exitComment,
      flag: data.flag,
      entryEmotion: data.entryEmotion,
      exitEmotion: data.exitEmotion,
      rating: data.rating,
      charts: data.charts,
    }

    trades.push(trade);
  })

  return trades;
}

export const fetchTradesRequest = () => action(FETCH_TRADES_REQUEST);
export const fetchTradesSuccess = (trades: Types.Trade[]) => action(FETCH_TRADES_SUCCESS, trades);
export const fetchTradesFailure = (message: string) => action(FETCH_TRADES_FAILURE, message);

export const createTradeRequest = () => action(CREATE_TRADE_REQUEST);
export const createTradeSuccess = (trade: Types.Trade) => action(CREATE_TRADE_SUCCESS, trade);
export const createTradeFailure = (message: string) => action(CREATE_TRADE_FAILURE, message);

export const modifyTradeRequest = () => action(MODIFY_TRADE_REQUEST);
export const modifyTradeSuccess = (trade: Types.Trade) => action(MODIFY_TRADE_SUCCESS, trade);
export const modifyTradeFailure = (message: string) => action(MODIFY_TRADE_FAILURE, message);

export const deleteTradeRequest = () => action(DELETE_TRADE_REQUEST);
export const deleteTradeSuccess = (trade: Types.Trade) => action(DELETE_TRADE_SUCCESS, trade);
export const deleteTradeFailure = (message: string) => action(DELETE_TRADE_FAILURE, message);

export const clearTrades = () => action(CLEAR_TRADES);
export const setTradeFilters = (filters: Types.TradeFilters) => action(SET_TRADE_FILTERS, filters);


export const fetchTrades = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    let journalId = typeof journal === 'string' ? journal : journal.id;

    fetchTradesRequest();

    firestore.collection('trades').where("journalId", "==", journalId).get()
    .then((snapshot: firestore.QuerySnapshot) => fetchTradesSuccess(extractTrades(snapshot)))
    .catch((err: Error) => fetchTradesFailure(err.message || "Something went wrong."));
  }
} 

export const createTrade = (trade: Types.Trade) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 

    delete trade.id;

    let flatTrade = {
      ...trade,
      created: new Date(),
      modified: new Date(),
      entryPrice: trade.entryPrice.toString(), //TODO: OR THESE
      positionSize: trade.positionSize.toString(),
      stopLoss: trade.stopLoss.toString(),
      takeProfit: trade.takeProfit.toString(),
      exitPrice: trade.exitDate ? trade.exitPrice.toString() : null,
      fees:  trade.exitDate ? trade.fees.toJSObject() : null,
      pl:  trade.exitDate ? trade.fees.toJSObject() : null,
    }

    createTradeRequest();

    firestore.collection('trades').add(flatTrade)
    .then((doc: any) => createTradeSuccess(doc))
    .catch((err: Error) => createTradeFailure(err.message || "Something went wrong."));
  }
}

export const modifyTrade = (trade: Types.Trade) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    trade.modified = new Date();

    let flatTrade = {
      ...trade,
      entryPrice: trade.entryPrice.toString(), //TODO: OR THESE
      positionSize: trade.positionSize.toString(),
      stopLoss: trade.stopLoss.toString(),
      takeProfit: trade.takeProfit.toString(),
      exitPrice: trade.exitPrice ? trade.exitPrice.toString() : null,
      fees: trade.fees ? trade.fees.toJSObject() : null,
      pl: trade.pl ? trade.pl.toJSObject() : null,
    }

    modifyTradeRequest();

    firestore.collection('trades').doc(trade.id).update(flatTrade)
    .then((doc: any) => modifyTradeSuccess(trade))
    .catch((err: Error) => modifyTradeFailure(err.message || "Something went wrong."));
  }
}

export const deleteTrade = (trade: Types.Trade) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 

    deleteTradeRequest();

    firestore.collection('trades').doc(trade.id).delete()
    .then(() => deleteTradeSuccess(trade))
    .catch((err: Error) => deleteTradeFailure(err.message || "Something went wrong."));
  }
}
