import * as React from 'react';
import { TradeFilterComponent } from './TradeFilter';
import { shallow } from 'enzyme';
import Types from 'Types';


describe("<TradeFilter />", () => {
  it('matches snapshot', () => {
		const onSetTradeFilters = jest.fn();
    const component = shallow(<TradeFilterComponent onSetTradeFilters={ onSetTradeFilters } />);
    expect(component).toMatchSnapshot();
	});

  it('calls onSetTradeFilters with the right arguments', () => {
		const onSetTradeFilters = jest.fn();
		const component = shallow(<TradeFilterComponent onSetTradeFilters={ onSetTradeFilters } />);

		const instrument = 'GBPJPY';
		const strategy = 'Cypher';
		const kind = 'long';
		const rating = 1;
		const entryDate: Types.TradeFilters['entryDate'] = null;
		const exitDate: Types.TradeFilters['exitDate'] = null;
		const profit: Types.TradeFilters['profit'] = null;
		const hitTakeProfit: Types.TradeFilters['hitTakeProfit'] = null;
		const flagged: Types.TradeFilters['flagged'] = null;
		const managed: Types.TradeFilters['managed'] = null;
		const tags: Types.TradeFilters['tags'] = null;
		const emotions: Types.TradeFilters['emotions'] = null;

		const expectedFilters: Types.TradeFilters = {
			instrument: instrument,
			strategy: strategy,
			kind: kind,
			rating: rating,
			entryDate: entryDate,
			exitDate: exitDate,
			profit: profit,
			hitTakeProfit: hitTakeProfit,
			flagged: flagged,
			managed: managed,
			tags: tags,
			emotions: emotions,
		};

		component.find('.trade-filter-instrument').simulate('change', { target: { value: instrument } });
		component.find('.trade-filter-strategy').simulate('change', { target: { value: strategy } });
		component.find('.trade-filter-kind').simulate('change', { target: { value: kind } });
		component.find('.trade-filter-rating').simulate('change', { target: { value: rating } });
		// component.find('.trade-filter-entry-date').simulate('change', { target: { value: entryDate } });
		// component.find('.trade-filter-exit-date').simulate('change', { target: { value: exitDate } });
		// component.find('.trade-filter-profit').simulate('click');
		// component.find('.trade-filter-hit-take-profit').simulate('click');
		// component.find('.trade-filter-flagged').simulate('click');
		// component.find('.trade-filter-flagged').simulate('click');
		// component.find('.trade-filter-managed').simulate('click');
		// component.find('.trade-filter-managed').simulate('click');
		// component.find('.trade-filter-tags').simulate('change', { target: { value: tags } });
		// component.find('.trade-filter-emotions').simulate('change', { target: { value: emotions } });

		expect(onSetTradeFilters).toBeCalledTimes(4);
		expect(JSON.stringify(onSetTradeFilters.mock.calls[3][0]) === JSON.stringify(expectedFilters)).toBeTruthy();
  });
});