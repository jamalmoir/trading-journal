import { firestore } from 'firebase';
import { getFirebase } from 'react-redux-firebase';
import { Dispatch } from 'redux';
import { getFirestore } from 'redux-firestore';
import Types from 'Types';
import { JournalState } from '../reducers/journal';
import { CREATE_JOURNAL, CREATE_TRADE, CLEAR_TRADES, FETCH_JOURNALS, FETCH_TRADES, MODIFY_JOURNAL, MODIFY_TRADE, SET_ACTIVE_JOURNAL, SET_TRADE_FILTERS } from './actionTypes';
import { action } from 'typesafe-actions';
import { Money } from '../../utils/moolah';
import { stringsToTags } from '../../utils/utils';


type Extras = {
  getFirebase: typeof getFirebase,
  getFirestore: typeof getFirestore,
};

let extractJournals = (snapshot: firestore.QuerySnapshot): Types.Journal[] => {
  let journals: Types.Journal[] = [];

  snapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
    let data = doc.data();

    journals.push({
      id: doc.id,
      userId: data.userId,
      kind: data.kind,
      currency: data.currency,
      name: data.name,
      created: data.created,
      modified: data.modified,
      tradeCount: data.tradeCount,
    })
  })

  return journals;
}

export const fetchJournals = () => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    const auth = getState().firebase.auth;

    firestore.collection('journals').where("userId", "==", auth.uid).get().then((snapshot: firestore.QuerySnapshot) => {
        let journals = extractJournals(snapshot);

        dispatch({type: FETCH_JOURNALS, journals});
    }).catch((err: Error) => console.error("Failed to retrieve journal list." + err.message))
  }
} 

export const setActiveJournal = (journal: Types.Journal) => action(SET_ACTIVE_JOURNAL, journal);

export const createJournal = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    const auth = getState().firebase.auth;

    delete journal.id;
    journal.userId = auth.uid;

    firestore.collection('journals').add(journal).then((doc: any) => {
      journal.id = doc.id;

      dispatch({type: CREATE_JOURNAL, journal});
    }).catch((err: Error) => console.error(err));
  }
}

export const modifyJournal = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => JournalState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 

    firestore.collection('journals').doc(journal.id).update(journal).then(() => {
      dispatch({type: MODIFY_JOURNAL, journal});
    }).catch((err: Error) => console.error(err));
  }
}

let extractTrades = (snapshot: firestore.QuerySnapshot): Types.Trade[] => {
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

export const fetchTrades = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    let journalId = typeof journal === 'string' ? journal : journal.id;

    firestore.collection('trades').where("journalId", "==", journalId).get().then((snapshot: firestore.QuerySnapshot) => {
      let trades = extractTrades(snapshot);

      dispatch({type: FETCH_TRADES, trades});
    }).catch((err: Error) => console.error("Failed to retrieve trade list." + err.message))
  }
} 

export const clearTrades = () => action(CLEAR_TRADES);

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

    firestore.collection('trades').add(flatTrade).then((doc: any) => {
      trade.id = doc.id;

      dispatch({type: CREATE_TRADE, trade});
    }).catch((err: Error) => console.error(err));
  }
}

export const modifyTrade = (trade: Types.Trade) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    trade.modified = new Date();
    console.log(trade)
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

    firestore.collection('trades').doc(trade.id).update(flatTrade).then(() => {
      dispatch({type: MODIFY_TRADE, trade});
    }).catch((err: Error) => console.error(err));
  }
}

export const setTradeFilters = (filters: Types.TradeFilters) => action(SET_TRADE_FILTERS, filters);