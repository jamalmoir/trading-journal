import Big from 'big.js'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Action, AnyAction, Dispatch } from 'redux'
import { AppAction, AppState } from '../redux/reducers/app'
import { AuthAction, AuthState } from '../redux/reducers/auth'
import { JournalAction, JournalState } from '../redux/reducers/journal'
import { CurrencyCode, Money } from '../utils/moolah'
import { Tag } from 'react-tag-autocomplete'
import { TradeState, TradeAction } from '../redux/reducers/trade'

declare module 'Types' {
  export interface RootState {
    readonly app: AppState
    readonly auth: AuthState
    readonly journal: JournalState
    readonly trade: TradeState
    readonly firebase: any
  }

  export type RootAction =
    | AppAction
    | AuthAction
    | JournalAction
    | TradeAction
    | CallHistoryMethodAction

  export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
  }

  export interface InputControls {
    [key: string]: {
      value: any
      errors: string[]
      touched: boolean
      validationRules: {
        [key: string]: any
      }
    }
  }

  export type JournalKind = 'live' | 'demo' | 'backtest'

  export interface Journal {
    id: string
    userId: string
    kind: JournalKind
    currency: CurrencyCode
    name: string
    created: Date
    modified: Date
    tradeCount: number
  }

  export type TradeKind = 'long' | 'short'
  export type TradeRating = -1 | 0 | 1

  export interface Trade {
    [index: string]: any
    id: string
    journalId: string
    created: Date
    modified: Date
    instrument: string
    strategy: string
    kind: TradeKind
    entryDate: Date
    entryPrice: Big
    positionSize: Big
    stopLoss: Big
    takeProfit: Big
    exitDate: Date
    exitPrice: Big
    fees: Money
    pl: Money
    hitTakeProfit: boolean
    mfe: Big
    mae: Big
    tags: Tag[]
    entryComment: string
    duringComment: string
    exitComment: string
    flag: boolean
    entryEmotion: Tag[]
    exitEmotion: Tag[]
    rating: TradeRating
    charts: string[]
  }

  export interface TradeFilters {
    instrument: string | null
    strategy: string | null
    kind: TradeKind | '' | null
    rating: -1 | 0 | 1 | '' | null
    entryDate: Date | null
    exitDate: Date | null
    profit: boolean | null
    hitTakeProfit: boolean | null
    flagged: boolean | null
    managed: boolean | null
    tags: string[] | null
    emotions: string[] | null
  }

  export interface User {
    id: string
    created: Date
    lastSeen: Date
    email: string
    planId: string
    displayName: string
    timeZone: string
  }

  export interface Plan {
    id: string
    name: string
    price: Money
    features: { [key: string]: any }
  }
}
