import Types from 'Types';
import { ActionType } from 'typesafe-actions';
import { CREATE_JOURNAL, CREATE_TRADE, FETCH_JOURNALS, FETCH_TRADES, MODIFY_JOURNAL, MODIFY_TRADE, SET_ACTIVE_JOURNAL, CLEAR_TRADES, SET_TRADE_FILTERS } from '../actions/actionTypes';
import * as actions from '../actions/journal';


export interface JournalState {
  journals: Types.Journal[];
  trades: Types.Trade[];
  activeJournal: Types.Journal | null;
  tradeFilters: Types.TradeFilters;
}

export type JournalAction = ActionType<typeof actions>;

const initialState: JournalState = {
  journals: [],
  trades: [],
  activeJournal: null,
  tradeFilters: {
    instrument: null,
    strategy: null,
    kind: '',
    rating: '',
    entryDate: null,
    exitDate: null,
    profit: null,
    hitTakeProfit: null,
    flagged: null,
    managed: null,
    tags: null,
    emotions: null,
  },
};

const reducer = (state = initialState, action: JournalAction) => {
  // @ts-ignore
  switch (action.type) {
    // @ts-ignore
    case FETCH_JOURNALS:
      return <JournalState>{
        ...state,
        // @ts-ignore
        journals: action.journals,
      }
    case SET_ACTIVE_JOURNAL:
      return <JournalState>{
        ...state,
        activeJournal: action.payload,
      }
    // @ts-ignore
    case CREATE_JOURNAL:
      return <JournalState>{
        ...state,
        // @ts-ignore
        journals: state.journals.concat([action.journal]),
      }
    // @ts-ignore
    case MODIFY_JOURNAL:
      // @ts-ignore
      let journals = state.journals.map(obj => obj.id === action.journal.id ? action.journal : obj);

      return <JournalState>{
        ...state,
        journals: journals,
      }
    // @ts-ignore
    case FETCH_TRADES:
      return <JournalState>{
        ...state,
        // @ts-ignore
        trades: action.trades,
      }
    // @ts-ignore
    case CLEAR_TRADES:
      return <JournalState>{
        ...state,
        // @ts-ignore
        trades: [],
      }
    // @ts-ignore
    case CREATE_TRADE:
      return <JournalState>{
        ...state,
        // @ts-ignore
        trades: state.trades.concat([action.trade]),
      }
    // @ts-ignore
    case MODIFY_TRADE:
      // @ts-ignore
      let trades = state.trades.map(obj => obj.id === action.trade.id ? action.trade : obj);

      return <JournalState>{
        ...state,
        trades: trades,
      }
    // @ts-ignore
    case SET_TRADE_FILTERS:
      // @ts-ignore
      return <JournalState>{
        ...state,
        // @ts-ignore
        tradeFilters: action.filters,
      }
    default:
      return state;
  }
}

export default reducer;