import Types from 'Types';
import { getFilteredTrades } from './journal';
import { testJournals, testTrades } from '../../utils/testHelpers';


const checkTrades = (trades: Types.Trade[], ids: string[]) => {
    for (const id of ids) {
        if (trades.filter(t => t.id === id).length !== 1) {
            return false
        }
    }

    return trades.length === ids.length ? true : false;
}

const getFilters = (next: Partial<Types.TradeFilters>) => {
    const offFilters: Types.TradeFilters = {
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

    return {...offFilters, ...next};
}


describe('journal actions', () => {
    it('filters correctly', () => {
        let state: Types.RootState = {
            journal: {
                journals: testJournals(),
                tradeFilters: {
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
                },
                trades: testTrades(),
                activeJournal: testJournals()[0],
            },
            app: {appLoaded: true, route: ''},
            auth: {},
            firebase: {auth: {uid: '1'}},
        }

        // No Filters
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({})}};
        expect(checkTrades(getFilteredTrades(state), ['1', '2', '3'])).toBeTruthy();
        expect(checkTrades(getFilteredTrades(state), ['4', '5'])).toBeFalsy();

        // Instrument
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({instrument: 'GBPJPY'})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();

        // Strategy
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({strategy: 'Strategy 2'})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();

        // Kind
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({kind: 'long'})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();

        // Rating
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({rating: -1})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();

        // Entry Date
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({entryDate: new Date('2019/10/31')})}};
        expect(checkTrades(getFilteredTrades(state), ['2', '3'])).toBeTruthy();
        
        // Exit Date
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({exitDate: new Date('2019/10/31')})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
        
        // Profit
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({profit: true})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({profit: false})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
        
        // Hit Take Profit
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({hitTakeProfit: true})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({hitTakeProfit: false})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
        
        // Flagged
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({flagged: true})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({flagged: false})}};
        expect(checkTrades(getFilteredTrades(state), ['1', '3'])).toBeTruthy();
        
        // Managed
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({managed: true})}};
        expect(checkTrades(getFilteredTrades(state), [])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({managed: false})}};
        expect(checkTrades(getFilteredTrades(state), [])).toBeTruthy();
        
        
        // Tags
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({strategy: 'Strategy 2'})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
        
        // Emptions
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({strategy: 'Strategy 2'})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
    });
});
