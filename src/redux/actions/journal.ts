import {
  FETCH_JOURNALS,
  CREATE_JOURNAL,
  MODIFY_JOURNAL,
  FETCH_TRADES,
  CREATE_TRADE,
  MODIFY_TRADE,
} from './actionTypes';
import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

import Types from 'Types';
import { JournalAction, JournalState } from '../reducers/journal';
import { firestore } from 'firebase';
import { useSelector } from 'react-redux';
import { AuthState } from '../reducers/auth';

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
    }).catch((err: Error) => console.log(err));
  }
}

export const modifyJournal = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => JournalState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 

    firestore.collection('journals').doc(journal.id).update(journal).then(() => {
      dispatch({type: MODIFY_JOURNAL, journal});
    }).catch((err: Error) => console.log(err));
  }
}

let extractTrades = (snapshot: firestore.QuerySnapshot): Types.Trade[] => {
  let trades: Types.Trade[] = [];

  snapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
    let data = doc.data();

    trades.push({
      id: doc.id,
      journalId: data.journalId,
      created: new Date(data.created * 1000),
      modified: new Date(data.modified * 1000),
      instrument: data.instrument,
      strategy: data.strategy,
      kind: data.kind,
      entryDate: new Date(data.entryDate.seconds * 1000),
      entryPrice: data.entryPrice,
      positionSize: data.positionSize,
      stopLoss: data.stopLoss,
      takeProfit: data.takeProfit,
      exitDate: new Date(data.exitDate.seconds * 1000),
      exitPrice: data.exitPrice,
      fees: data.fees,
      pl: data.pl,
      hitTakeProfit: data.hitTakeProfit,
      tags: data.tags,
      entryComment: data.entryComment,
      duringComment: data.duringComment,
      exitComment: data.exitComment,
      flag: data.flag,
      emotion: data.emotion,
      rating: data.rating,
      charts: data.charts,
    })
  })

  return trades;
}

export const fetchTrades = (journal: Types.Journal) => {
  console.log(journal)
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    const auth = getState().firebase.auth;

    firestore.collection('trades').where("journalId", "==", journal.id).get().then((snapshot: firestore.QuerySnapshot) => {
        let trades = extractTrades(snapshot);

        dispatch({type: FETCH_TRADES, trades});
    }).catch((err: Error) => console.error("Failed to retrieve trade list." + err.message))
  }
} 

export const createTrade = (trade: Types.Trade) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 
    const auth = getState().firebase.auth;

    delete trade.id;

    let flatTrade = {
      ...trade,
      entryPrice: trade.entryPrice.toString(),
      positionSize: trade.positionSize.toString(),
      stopLoss: trade.stopLoss.toString(),
      takeProfit: trade.takeProfit.toString(),
      exitPrice: trade.exitPrice.toString(),
      fees: trade.fees.toString(),
      pl: trade.fees.toString(),
    }

    firestore.collection('trades').add(flatTrade).then((doc: any) => {
      trade.id = doc.id;

      dispatch({type: CREATE_TRADE, trade});
    }).catch((err: Error) => console.log(err));
  }
}

export const modifyTrade = (trade: Types.Trade) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firestore = getFirestore(); 

    firestore.collection('trades').doc(trade.id).update(trade).then(() => {
      dispatch({type: MODIFY_TRADE, trade});
    }).catch((err: Error) => console.log(err));
  }
}
