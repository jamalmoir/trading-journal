import { getFirebase } from 'react-redux-firebase';
import { Dispatch } from 'redux';
import { getFirestore } from 'redux-firestore';
import { USER_SIGN_IN_SUCCESS, USER_SIGN_OUT_SUCCESS } from './actionTypes';

type Extras = {
  getFirebase: typeof getFirebase,
  getFirestore: typeof getFirestore,
};

export const authenticateUser = (credentials: any) => {
  return (dispatch: Dispatch, getState: () => any, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firebase = getFirebase(); 

    firebase.login(credentials).then(() => {
      dispatch({ type: USER_SIGN_IN_SUCCESS });
    }).catch((err: Error) => console.log(err));
  }
};

export const unauthenticateUser = () => {
  return (dispatch: Dispatch, getState: () => any, { getFirebase, getFirestore }: Extras) => {
    // @ts-ignore
    const firebase = getFirebase(); 

    firebase.auth().signOut().then(() => {
      dispatch({ type: USER_SIGN_OUT_SUCCESS });
    }).catch((err: Error) => console.log(err));
  }
};
