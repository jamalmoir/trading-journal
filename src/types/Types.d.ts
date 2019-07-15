import { ReactNode } from 'react';
import { Action, AnyAction, Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';

import rootReducer from '../redux/reducer';
import {AppState, AppAction} from '../redux/reducers/app'
import { AuthState, AuthAction } from '../redux/reducers/auth';
import { JournalState, JournalAction } from '../redux/reducers/journal';
import { CallHistoryMethodAction } from 'connected-react-router';
import { Money, CurrencySymbol } from '../utils/moolah';
import Big from 'big.js';


declare module 'Types' {
  export interface RootState {
    readonly app: AppState;
    readonly auth: AuthState;
    readonly journal: JournalState;
    readonly firebase: any;
  }

  export type RootAction = AppAction | AuthAction | JournalAction | CallHistoryMethodAction;

  export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
  }

  export interface Journal {
    id: string;
    userId: string;
    kind: 'live' | 'demo' | 'backtest';
    currency: CurrencySymbol;
    name: string;
    created: Date;
    modified: Date;
    tradeCount: number;
  }

  export interface Trade {
    id: string;
    journalId: string;
    created: Date;
    modified: Date;
    instrument: string;
    strategy: string;
    kind: 'long' | 'short';
    entryDate: Date;
    entryPrice: Big;
    positionSize: Big;
    stopLoss: Big;
    takeProfit: Big;
    exitDate: Date;
    exitPrice: Big;
    fees: Money;
    pl: Money;
    hitTakeProfit: boolean;
    tags: string[];
    entryComment: string;
    duringComment: string;
    exitComment: string;
    flag: boolean;
    emotion: string[];
    rating: -2 | -1 | 0 | 1 | 2;
    charts: string[];
  }
}