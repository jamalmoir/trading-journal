import { firestore } from 'firebase';
import { getFirebase } from 'react-redux-firebase';
import { Dispatch } from 'redux';
import { getFirestore } from 'redux-firestore';
import Types from 'Types';
import { action } from 'typesafe-actions';
import { JournalState } from '../reducers/journal';
import { CREATE_JOURNAL_FAILURE, CREATE_JOURNAL_REQUEST, CREATE_JOURNAL_SUCCESS, DELETE_JOURNAL_FAILURE, DELETE_JOURNAL_REQUEST, FETCH_JOURNALS_FAILURE, FETCH_JOURNALS_REQUEST, FETCH_JOURNALS_SUCCESS, MODIFY_JOURNAL_FAILURE, MODIFY_JOURNAL_REQUEST, SET_ACTIVE_JOURNAL, MODIFY_JOURNAL_SUCCESS, DELETE_JOURNAL_SUCCESS } from './actionTypes';
import { modifyTradeFailure } from './trade';


type Extras = {
  getFirebase: typeof getFirebase,
  getFirestore: typeof getFirestore,
};

const extractJournals = (snapshot: firestore.QuerySnapshot): Types.Journal[] => {
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

export const fetchJournalsRequest = () => action(FETCH_JOURNALS_REQUEST);
export const fetchJournalsSuccess = (journals: Types.Journal[]) => action(FETCH_JOURNALS_SUCCESS, journals);
export const fetchJournalsFailure = (message: string) => action(FETCH_JOURNALS_FAILURE, message);

export const createJournalRequest = () => action(CREATE_JOURNAL_REQUEST);
export const createJournalSuccess = (journal: Types.Journal) => action(CREATE_JOURNAL_SUCCESS, journal);
export const createJournalFailure = (message: string) => action(CREATE_JOURNAL_FAILURE, message);

export const modifyJournalRequest = () => action(MODIFY_JOURNAL_REQUEST);
export const modifyJournalSuccess = (journal: Types.Journal) => action(MODIFY_JOURNAL_SUCCESS, journal);
export const modifyJournalFailure = (message: string) => action(MODIFY_JOURNAL_FAILURE, message);

export const deleteJournalRequest = () => action(DELETE_JOURNAL_REQUEST);
export const deleteJournalSuccess = (journal: Types.Journal) => action(DELETE_JOURNAL_SUCCESS, journal);
export const deleteJournalFailure = (message: string) => action(DELETE_JOURNAL_FAILURE, message);

export const setActiveJournal = (journal: Types.Journal) => action(SET_ACTIVE_JOURNAL, journal);

export const fetchJournals = () => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    const firebase = getFirebase()
    const firestore: firestore.Firestore = getFirestore(firebase); 
    const auth = getState().firebase.auth;

    dispatch(fetchJournalsRequest());

    firestore.collection('journals').where("userId", "==", auth.uid).get()
    .then((snapshot: firestore.QuerySnapshot) => dispatch(fetchJournalsSuccess(extractJournals(snapshot))))
    .catch((err: Error) => dispatch(fetchJournalsFailure(err.message || "Something went wrong.")));
  }
} 


export const createJournal = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => Types.RootState, { getFirebase, getFirestore }: Extras) => {
    const firebase = getFirebase()
    const firestore: firestore.Firestore = getFirestore(firebase); 
    const auth = getState().firebase.auth;

    delete journal.id;
    journal.userId = auth.uid;

    dispatch(createJournalRequest());

    firestore.collection('journals').add(journal)
    .then((doc: any) => dispatch(createJournalSuccess(journal)))
    .catch((err: Error) => dispatch(createJournalFailure(err.message || "Something went wrong.")));
  }
}

export const modifyJournal = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => JournalState, { getFirebase, getFirestore }: Extras) => {
    const firebase = getFirebase()
    const firestore: firestore.Firestore = getFirestore(firebase); 

    dispatch(modifyJournalRequest());

    firestore.collection('journals').doc(journal.id).update(journal)
    .then((doc: any) => dispatch(modifyJournalSuccess(journal)))
    .catch((err: Error) => dispatch(modifyTradeFailure(err.message || "Something went wrong.")));
  }
}

export const deleteJournal = (journal: Types.Journal) => {
  return (dispatch: Dispatch, getState: () => JournalState, { getFirebase, getFirestore }: Extras) => {
    const firebase = getFirebase()
    const firestore: firestore.Firestore = getFirestore(firebase); 

    dispatch(deleteJournalRequest());

    firestore.collection('journals').doc(journal.id).delete()
    .then(() => dispatch(deleteJournalSuccess(journal)))
    .catch((err: Error) => dispatch(deleteJournalFailure(err.message || "Something went wrong.")));
  }
}
