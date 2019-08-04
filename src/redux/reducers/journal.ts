import Types from 'Types';
import { ActionType } from 'typesafe-actions';
import { CREATE_JOURNAL, CREATE_TRADE, DELETE_JOURNAL, FETCH_JOURNALS, FETCH_TRADES, MODIFY_JOURNAL, MODIFY_TRADE } from '../actions/actionTypes';
import * as actions from '../actions/journal';


export interface JournalState {
  journals: Types.Journal[];
  trades: Types.Trade[];
}

export type JournalAction = ActionType<typeof actions>;

const initialState: JournalState = {
  journals: [],
  trades: [],
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
    case DELETE_JOURNAL:
      return <JournalState>{
        ...state,
        journals: state.journals,
      }
    // @ts-ignore
    case FETCH_TRADES:
      return <JournalState>{
        ...state,
        // @ts-ignore
        trades: action.trades,
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
    case DELETE_JOURNAL:
      return <JournalState>{
        ...state,
        journals: state.journals,
      }
    default:
      return state;
  }
}

export default reducer;