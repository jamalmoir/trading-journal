import { combineReducers } from 'redux'
import Types from 'Types'
import { ActionType } from 'typesafe-actions'
import {
  CLEAR_TRADES,
  CREATE_TRADE_FAILURE,
  CREATE_TRADE_REQUEST,
  CREATE_TRADE_SUCCESS,
  DELETE_TRADE_FAILURE,
  DELETE_TRADE_REQUEST,
  DELETE_TRADE_SUCCESS,
  FETCH_TRADES_FAILURE,
  FETCH_TRADES_REQUEST,
  FETCH_TRADES_SUCCESS,
  MODIFY_TRADE_FAILURE,
  MODIFY_TRADE_REQUEST,
  MODIFY_TRADE_SUCCESS,
  SET_TRADE_FILTERS,
} from '../actions/actionTypes'
import * as actions from '../actions/trade'

export interface TradeState {
  trades: Types.Trade[]
  tradeFilters: Types.TradeFilters
  isRequesting: boolean
  errorMessage: string
}

export type TradeAction = ActionType<typeof actions>

const emptyFilters: Types.TradeFilters = {
  instrument: null,
  strategy: null,
  kind: null,
  rating: null,
  entryDate: null,
  exitDate: null,
  profit: null,
  hitTakeProfit: null,
  flagged: null,
  managed: null,
  tags: null,
  emotions: null,
}

const reducer = () => {
  const trades = (state: TradeState['trades'] = [], action: TradeAction) => {
    switch (action.type) {
      case FETCH_TRADES_SUCCESS:
        return action.payload
      case CREATE_TRADE_SUCCESS:
        return [...state, action.payload]
      case MODIFY_TRADE_SUCCESS:
        return state.map(trade =>
          trade.id === action.payload.id ? action.payload : trade
        )
      case DELETE_TRADE_SUCCESS:
        return state.filter(trade => trade.id !== action.payload.id)
      case CLEAR_TRADES:
        return []
      default:
        return state
    }
  }

  const tradeFilters = (
    state: TradeState['tradeFilters'] = emptyFilters,
    action: TradeAction
  ) => {
    switch (action.type) {
      case SET_TRADE_FILTERS:
        return action.payload
      default:
        return state
    }
  }

  const isRequesting = (
    state: TradeState['isRequesting'] = false,
    action: TradeAction
  ) => {
    switch (action.type) {
      case FETCH_TRADES_REQUEST:
      case CREATE_TRADE_REQUEST:
      case MODIFY_TRADE_REQUEST:
      case DELETE_TRADE_REQUEST:
        return true
      case FETCH_TRADES_SUCCESS:
      case FETCH_TRADES_FAILURE:
      case CREATE_TRADE_SUCCESS:
      case CREATE_TRADE_FAILURE:
      case MODIFY_TRADE_SUCCESS:
      case MODIFY_TRADE_FAILURE:
      case DELETE_TRADE_SUCCESS:
      case DELETE_TRADE_FAILURE:
        return false
      default:
        return state
    }
  }

  const errorMessage = (
    state: TradeState['errorMessage'] = null,
    action: TradeAction
  ) => {
    switch (action.type) {
      case FETCH_TRADES_REQUEST:
      case FETCH_TRADES_SUCCESS:
      case CREATE_TRADE_REQUEST:
      case CREATE_TRADE_SUCCESS:
      case MODIFY_TRADE_REQUEST:
      case MODIFY_TRADE_SUCCESS:
      case DELETE_TRADE_REQUEST:
      case DELETE_TRADE_SUCCESS:
        return null
      case FETCH_TRADES_FAILURE:
      case CREATE_TRADE_FAILURE:
      case MODIFY_TRADE_FAILURE:
      case DELETE_TRADE_FAILURE:
        return action.payload
      default:
        return state
    }
  }

  return combineReducers({
    trades,
    tradeFilters,
    isRequesting,
    errorMessage,
  })
}

export default reducer
