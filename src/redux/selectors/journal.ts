import { createSelector } from 'reselect'
import Types from 'Types'
import Big from 'big.js'

const getAllTrades = (state: Types.RootState): Types.Trade[] =>
  state.trade.trades

const getUser = (state: Types.RootState) => state.firebase.auth.uid
const getJournal = (state: Types.RootState) => state.journal.activeJournal
const getInstrument = (state: Types.RootState) =>
  state.trade.tradeFilters.instrument
const getStrategy = (state: Types.RootState) =>
  state.trade.tradeFilters.strategy
const getKind = (state: Types.RootState) => state.trade.tradeFilters.kind
const getRating = (state: Types.RootState) => state.trade.tradeFilters.rating
const getEntryDate = (state: Types.RootState) =>
  state.trade.tradeFilters.entryDate
const getExitDate = (state: Types.RootState) =>
  state.trade.tradeFilters.exitDate
const getProfit = (state: Types.RootState) => state.trade.tradeFilters.profit
const getHitTakeProfit = (state: Types.RootState) =>
  state.trade.tradeFilters.hitTakeProfit
const getFlagged = (state: Types.RootState) => state.trade.tradeFilters.flagged
const getManaged = (state: Types.RootState) => state.trade.tradeFilters.managed
const getTags = (state: Types.RootState) => state.trade.tradeFilters.tags
const getEmotions = (state: Types.RootState) =>
  state.trade.tradeFilters.emotions

export const getTrades = createSelector(
  [getUser, getJournal, getAllTrades],
  (userFilter, journalFilter, trades) => {
    return userFilter === null || journalFilter === null
      ? trades
      : trades.filter(
          trade =>
            journalFilter.userId === userFilter &&
            trade.journalId === journalFilter.id
        )
  }
)

export const getInstrumentTrades = createSelector(
  [getInstrument, getTrades],
  (instrumentFilter, trades) => {
    return instrumentFilter === null
      ? trades
      : trades.filter(trade => trade.instrument === instrumentFilter)
  }
)

export const getStrategyTrades = createSelector(
  [getStrategy, getTrades],
  (strategyFilter, trades) => {
    return strategyFilter === null
      ? trades
      : trades.filter(trade => trade.strategy === strategyFilter)
  }
)

export const getKindTrades = createSelector(
  [getKind, getTrades],
  (kindFilter, trades) => {
    return kindFilter === null
      ? trades
      : trades.filter(trade => trade.kind === kindFilter)
  }
)

export const getRatingTrades = createSelector(
  [getRating, getTrades],
  (ratingFilter, trades) => {
    return ratingFilter === null
      ? trades
      : trades.filter(trade => trade.rating === ratingFilter)
  }
)

export const getEntryDateTrades = createSelector(
  [getEntryDate, getTrades],
  (entryDateFilter, trades) => {
    return entryDateFilter === null
      ? trades
      : trades.filter(
          trade =>
            trade.entryDate &&
            trade.entryDate.setHours(0, 0, 0, 0) ===
              entryDateFilter.setHours(0, 0, 0, 0)
        )
  }
)

export const getExitDateTrades = createSelector(
  [getExitDate, getTrades],
  (exitDateFilter, trades) => {
    return exitDateFilter === null
      ? trades
      : trades.filter(
          trade =>
            trade.exitDate &&
            trade.exitDate.setHours(0, 0, 0, 0) ===
              exitDateFilter.setHours(0, 0, 0, 0)
        )
  }
)

export const getProfitTrades = createSelector(
  [getProfit, getTrades],
  (profitFilter, trades) => {
    return profitFilter === null
      ? trades
      : trades.filter(trade => {
          if (typeof trade.pl !== 'undefined' && trade.pl !== null) {
            return profitFilter ? trade.pl.gt(Big(0)) : trade.pl.lte(Big(0))
          }
        })
  }
)

export const getHitTakeProfitTrades = createSelector(
  [getHitTakeProfit, getTrades],
  (hitTakeProfitFilter, trades) => {
    return hitTakeProfitFilter === null
      ? trades
      : trades.filter(trade => trade.hitTakeProfit === hitTakeProfitFilter)
  }
)

export const getFlaggedTrades = createSelector(
  [getFlagged, getTrades],
  (flaggedFilter, trades) => {
    return flaggedFilter === null
      ? trades
      : trades.filter(trade => trade.flag === flaggedFilter)
  }
)

// TODO: sort out managed mechanics
export const getManagedTrades = createSelector(
  [getManaged, getTrades],
  (managedFilter, trades) => {
    return managedFilter === null
      ? trades
      : trades.filter(trade => trade.managed === managedFilter)
  }
)

export const getTagsTrades = createSelector(
  [getTags, getTrades],
  (tagsFilter, trades) => {
    return tagsFilter === null || !tagsFilter.length
      ? trades
      : trades.filter(trade => {
          for (let filter of tagsFilter) {
            return !!trade.tags.filter(t => t.name === filter).length
          }
        })
  }
)

export const getEmotionsTrades = createSelector(
  [getEmotions, getTrades],
  (emotionsFilter, trades) => {
    return emotionsFilter === null || !emotionsFilter.length
      ? trades
      : trades.filter(trade => {
          for (let filter of emotionsFilter) {
            return (
              trade.entryEmotion.filter(t => t.name === filter).length ||
              trade.exitEmotion.filter(t => t.name === filter).length
            )
          }
        })
  }
)

export const getFilteredTrades = createSelector(
  [
    getInstrumentTrades,
    getStrategyTrades,
    getKindTrades,
    getRatingTrades,
    getEntryDateTrades,
    getExitDateTrades,
    getProfitTrades,
    getHitTakeProfitTrades,
    getFlaggedTrades,
    getManagedTrades,
    getTagsTrades,
    getEmotionsTrades,
  ],
  (
    instrumentTrades,
    strategyTrades,
    kindTrades,
    ratingTrades,
    entryDateTrades,
    exitDateTrades,
    profitTrades,
    hitTakeProfitTrades,
    flaggedTrades,
    managedTrades,
    tagsTrades,
    emotionsTrades
  ) => {
    return instrumentTrades
      .filter(t => strategyTrades.includes(t))
      .filter(t => kindTrades.includes(t))
      .filter(t => ratingTrades.includes(t))
      .filter(t => entryDateTrades.includes(t))
      .filter(t => exitDateTrades.includes(t))
      .filter(t => profitTrades.includes(t))
      .filter(t => hitTakeProfitTrades.includes(t))
      .filter(t => flaggedTrades.includes(t))
      .filter(t => managedTrades.includes(t))
      .filter(t => tagsTrades.includes(t))
      .filter(t => emotionsTrades.includes(t))
  }
)
