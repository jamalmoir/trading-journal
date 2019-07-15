import { USER_AUTH } from './actionTypes';
import { AuthUser } from '../reducers/auth';
import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

type Extras = {
  getFirebase: typeof getFirebase,
  getFirestore: typeof getFirestore,
};

export const authenticateUser = (credentials: any) => {
  return (dispatch: Dispatch, getState: () => any, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firebase = getFirebase(); 

    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      dispatch({ type: USER_AUTH });
    }).catch((err: Error) => console.log(err));
  }
};
