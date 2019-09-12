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

    it('shows all trades belonging to a journal belonging to a user with no filters', () => {
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({})}};
        expect(checkTrades(getFilteredTrades(state), ['1', '2', '3'])).toBeTruthy();
        expect(checkTrades(getFilteredTrades(state), ['4', '5'])).toBeFalsy();
    });

    it('filters by intrument correctly', () => {
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({instrument: 'GBPJPY'})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();
    });

    it('it filters by strategy correctly', () => {
        // Strategy
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({strategy: 'Strategy 2'})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
    });

    it('it filters by kind correctly', () => {
        // Kind
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({kind: 'long'})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();
    });

    it('it filters by rating correctly', () => {
        // Rating
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({rating: -1})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
    });

    it('it filters by entry date correctly', () => {
        // Entry Date
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({entryDate: new Date('2019/10/31')})}};
        expect(checkTrades(getFilteredTrades(state), ['2', '3'])).toBeTruthy();
    });

    it('it filters by exit date correctly', () => {
        // Exit Date
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({exitDate: new Date('2019/10/31')})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
    });

    it('it filters by profit correctly', () => {
        // Profit
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({profit: true})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({profit: false})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
    });

    it('it filters by hit take profit correctly', () => {
        // Hit Take Profit
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({hitTakeProfit: true})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({hitTakeProfit: false})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
    });

    it('it filters by flagged correctly', () => {
        // Flagged
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({flagged: true})}};
        expect(checkTrades(getFilteredTrades(state), ['2'])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({flagged: false})}};
        expect(checkTrades(getFilteredTrades(state), ['1', '3'])).toBeTruthy();
    });

    it('it filters by managed correctly', () => {
        // Managed
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({managed: true})}};
        expect(checkTrades(getFilteredTrades(state), [])).toBeTruthy();
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({managed: false})}};
        expect(checkTrades(getFilteredTrades(state), [])).toBeTruthy();
    });

    it('it filters by tags correctly', () => {
        // Tags
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({tags: ['monday']})}};
        expect(checkTrades(getFilteredTrades(state), ['1'])).toBeTruthy();
    });

    it('it filters by emotions correctly', () => {
        // Emptions
        state = {...state, journal: {...state.journal, tradeFilters: getFilters({emotions: ['rushed']})}};
        expect(checkTrades(getFilteredTrades(state), ['2', '3'])).toBeTruthy();
    });
});
