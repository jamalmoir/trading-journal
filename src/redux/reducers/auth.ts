import { ActionType } from 'typesafe-actions';
import { USER_SIGN_IN_SUCCESS, USER_SIGN_OUT_SUCCESS } from '../actions/actionTypes';
import * as actions from '../actions/auth';


export interface AuthState {
  isAuthed: boolean;
  user: {
    email: string;
  }
}

export type AuthAction = ActionType<typeof actions>

export interface AuthUser {
  email: string;
}

const initialState: AuthState = {
  isAuthed: true, //TODO: not default authed
  user: null
};

const reducer = (state = initialState, action: AuthAction) => {
  // @ts-ignore
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
      return <AuthState>{
        ...state,
      }
    case USER_SIGN_OUT_SUCCESS:
      return <AuthState>{
        ...state,
      }
    default:
      return state;
  }
}

export default reducer;