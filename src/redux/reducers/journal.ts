import Types from 'Types'
import { ActionType } from 'typesafe-actions'
import {
  FETCH_JOURNALS_SUCCESS,
  CREATE_JOURNAL_SUCCESS,
  MODIFY_JOURNAL_SUCCESS,
  DELETE_JOURNAL_SUCCESS,
  SET_ACTIVE_JOURNAL,
  FETCH_JOURNALS_REQUEST,
  FETCH_JOURNALS_FAILURE,
  CREATE_JOURNAL_REQUEST,
  MODIFY_JOURNAL_REQUEST,
  DELETE_JOURNAL_REQUEST,
  CREATE_JOURNAL_FAILURE,
  MODIFY_JOURNAL_FAILURE,
  DELETE_JOURNAL_FAILURE,
} from '../actions/actionTypes'
import * as actions from '../actions/journal'
import { combineReducers } from 'redux'

export interface JournalState {
  journals: Types.Journal[]
  activeJournal: Types.Journal | null
  isRequesting: boolean
  errorMessage: string
}

export type JournalAction = ActionType<typeof actions>

const reducer = () => {
  const journals = (
    state: JournalState['journals'] = [],
    action: JournalAction
  ) => {
    switch (action.type) {
      case FETCH_JOURNALS_SUCCESS:
        return action.payload
      case CREATE_JOURNAL_SUCCESS:
        return [...state, action.payload]
      case MODIFY_JOURNAL_SUCCESS:
        return state.map(journal =>
          journal.id === action.payload.id ? action.payload : journal
        )
      case DELETE_JOURNAL_SUCCESS:
        return state.filter(journal => journal.id !== action.payload.id)
      default:
        return state
    }
  }

  const activeJournal = (
    state: JournalState['activeJournal'] = null,
    action: JournalAction
  ) => {
    switch (action.type) {
      case SET_ACTIVE_JOURNAL:
        return action.payload
      default:
        return state
    }
  }

  const isRequesting = (
    state: JournalState['isRequesting'] = false,
    action: JournalAction
  ) => {
    switch (action.type) {
      case FETCH_JOURNALS_REQUEST:
      case CREATE_JOURNAL_REQUEST:
      case MODIFY_JOURNAL_REQUEST:
      case DELETE_JOURNAL_REQUEST:
        return true
      case FETCH_JOURNALS_SUCCESS:
      case FETCH_JOURNALS_FAILURE:
      case CREATE_JOURNAL_SUCCESS:
      case CREATE_JOURNAL_FAILURE:
      case MODIFY_JOURNAL_SUCCESS:
      case MODIFY_JOURNAL_FAILURE:
      case DELETE_JOURNAL_SUCCESS:
      case DELETE_JOURNAL_FAILURE:
        return false
      default:
        return state
    }
  }

  const errorMessage = (
    state: JournalState['errorMessage'] = null,
    action: JournalAction
  ) => {
    switch (action.type) {
      case FETCH_JOURNALS_REQUEST:
      case FETCH_JOURNALS_SUCCESS:
      case CREATE_JOURNAL_REQUEST:
      case CREATE_JOURNAL_SUCCESS:
      case MODIFY_JOURNAL_REQUEST:
      case MODIFY_JOURNAL_SUCCESS:
      case DELETE_JOURNAL_REQUEST:
      case DELETE_JOURNAL_SUCCESS:
        return null
      case FETCH_JOURNALS_FAILURE:
      case CREATE_JOURNAL_FAILURE:
      case MODIFY_JOURNAL_FAILURE:
      case DELETE_JOURNAL_FAILURE:
        return action.payload
      default:
        return state
    }
  }

  return combineReducers({
    journals,
    activeJournal,
    isRequesting,
    errorMessage,
  })
}

export default reducer
