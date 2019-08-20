import Big from 'big.js';
import { CallHistoryMethodAction } from 'connected-react-router';
import { Action, AnyAction, Dispatch } from 'redux';
import { AppAction, AppState } from '../redux/reducers/app';
import { AuthAction, AuthState } from '../redux/reducers/auth';
import { JournalAction, JournalState } from '../redux/reducers/journal';
import { CurrencySymbol, Money } from '../utils/moolah';
import { Tag } from 'react-tag-autocomplete';


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
    [index: string]: any;
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
    mfe: Big;
    mae: Big;
    tags: string[];
    entryComment: string;
    duringComment: string;
    exitComment: string;
    flag: boolean;
    entryEmotion: string[];
    exitEmotion: string[];
    rating: -1 | 0 | 1;
    charts: string[];
  }

  export interface TradeFilters {
    instrument: string | null;
    strategy: string | null;
    kind: 'long' | 'short' | '' | null;
    rating: -1 | 0 | 1 | '' | null;
    entryDate: Date | null;
    exitDate: Date | null;
    profit: boolean | null;
    hitTakeProfit: boolean | null;
    flagged: boolean | null;
    managed: boolean | null;
    tags: Tag[] | null;
    emotions: Tag[] | null;
  }
}