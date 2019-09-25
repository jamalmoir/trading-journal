import { ActionType } from 'typesafe-actions';
import { APP_LOAD, ROUTE_CHANGE } from '../actions/actionTypes';
import * as actions from '../actions/app';


export interface AppState {
  appLoaded: boolean;
  route: any;
}

export type AppAction = ActionType<typeof actions>

const initialState: AppState = {
  appLoaded: false,
  route: null,
};

const reducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case APP_LOAD:
      return <AppState>{
        ...state,
        appLoaded: true
      }
    case ROUTE_CHANGE:
      return <AppState>{
        ...state,
        route: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;