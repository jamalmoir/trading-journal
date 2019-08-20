import { createSelector } from 'reselect'
import Types from 'Types';

const getTrades = (state: Types.RootState) => state.journal.trades;

const getInstrument = (state: Types.RootState) => state.journal.tradeFilters.instrument;
const getStrategy = (state: Types.RootState) => state.journal.tradeFilters.strategy;
const getKind = (state: Types.RootState) => state.journal.tradeFilters.kind;
const getRating = (state: Types.RootState) => state.journal.tradeFilters.rating;
const getEntryDate = (state: Types.RootState) => state.journal.tradeFilters.entryDate;
const getExitDate = (state: Types.RootState) => state.journal.tradeFilters.exitDate;
const getProfit = (state: Types.RootState) => state.journal.tradeFilters.profit;
const getHitTakeProfit = (state: Types.RootState) => state.journal.tradeFilters.hitTakeProfit;
const getFlagged = (state: Types.RootState) => state.journal.tradeFilters.flagged;
const getManaged = (state: Types.RootState) => state.journal.tradeFilters.managed;
const getTags = (state: Types.RootState) => state.journal.tradeFilters.tags;
const getEmotions = (state: Types.RootState) => state.journal.tradeFilters.emotions;


export const getInstrumentTrades = createSelector(
  [getInstrument, getTrades],
  (instrumentFilter, trades) => {
    return instrumentFilter === null ? trades : trades.filter(trade => trade.instrument === instrumentFilter);
  }
)

export const getStrategyTrades = createSelector(
  [getStrategy, getTrades],
  (strategyFilter, trades) => {
    return strategyFilter === null ? trades : trades.filter(trade => trade.instrument === strategyFilter);
  }
)

export const getKindTrades = createSelector(
  [getKind, getTrades],
  (kindFilter, trades) => {
    return kindFilter === null ? trades : trades.filter(trade => trade.instrument === kindFilter);
  }
)

export const getRatingTrades = createSelector(
  [getRating, getTrades],
  (ratingFilter, trades) => {
    return ratingFilter === null ? trades : trades.filter(trade => trade.rating === ratingFilter);
  }
)

export const getEntryDateTrades = createSelector(
  [getEntryDate, getTrades],
  (entryDateFilter, trades) => {
    return entryDateFilter === null ? trades : trades.filter(trade => trade.entryDate === entryDateFilter);
  }
)

export const getExitDateTrades = createSelector(
  [getExitDate, getTrades],
  (exitDateFilter, trades) => {
    return exitDateFilter === null ? trades : trades.filter(trade => trade.exitDate === exitDateFilter);
  }
)

export const getProfitTrades = createSelector(
  [getProfit, getTrades],
  (profitFilter, trades) => {
    return profitFilter === null ? trades : trades.filter(trade => trade.profit === profitFilter);
  }
)

export const getHitTakeProfitTrades = createSelector(
  [getHitTakeProfit, getTrades],
  (hitTakeProfitFilter, trades) => {
    return hitTakeProfitFilter === null ? trades : trades.filter(trade => trade.hitTakeProfit === hitTakeProfitFilter);
  }
)

export const getFlaggedTrades = createSelector(
  [getFlagged, getTrades],
  (flaggedFilter, trades) => {
    return flaggedFilter === null ? trades : trades.filter(trade => trade.flagged === flaggedFilter);
  }
)

export const getManagedTrades = createSelector(
  [getManaged, getTrades],
  (managedFilter, trades) => {
    return managedFilter === null ? trades : trades.filter(trade => trade.managed === managedFilter);
  }
)

export const getTagsTrades = createSelector(
  [getTags, getTrades],
  (tagsFilter, trades) => {
    return tagsFilter === null ? trades : trades.filter(trade => {
      for (let filter of tagsFilter) {
        if (trade.tags.includes(filter.name)) return true;
      }
    });
  }
)

export const getEmotionsTrades = createSelector(
  [getEmotions, getTrades],
  (emotionsFilter, trades) => {
    return emotionsFilter === null ? trades : trades.filter(trade => {
      for (let filter of emotionsFilter) {
        if (trade.entryEmotion.includes(filter.name) || trade.exitEmotion.includes(filter.name)) return true;
      }
    });
  }
)

export const getFilteredTrades = (state: Types.RootState) => {
  let trades;
  
  trades = getInstrumentTrades(state);
  trades = getStrategyTrades(state);
  trades = getKindTrades(state);
  trades = getRatingTrades(state);
  trades = getEntryDateTrades(state);
  trades = getExitDateTrades(state);
  trades = getProfitTrades(state);
  trades = getHitTakeProfitTrades(state);
  trades = getFlaggedTrades(state);
  trades = getManagedTrades(state);
  trades = getTagsTrades(state);
  trades = getEmotionsTrades(state);

  return trades;
}