
import * as React from 'react';
import { JournalListItem } from './JournalListItem';
import { shallow } from 'enzyme';
import Types from 'Types';


const testJournal: () => Types.Journal = () => ({
		id: 'someId',
		userId: 'someUserId',
		kind: 'live',
		currency: 'GBP',
		name: 'Some Journal',
		created: new Date('2019/09/10'),
		modified: new Date('2019/09/10'),
		tradeCount: 10,
});

describe("<JournalListItem />", () => {
  it('should match snapshot', () => {
    const component = shallow(<JournalListItem journal={ testJournal() }/>);
    expect(component).toMatchSnapshot();
	});
	
	it('should have the right badge depending on journal type', () => {
		const journal: Types.Journal = testJournal();
		const component = shallow(<JournalListItem journal={ journal }/>);
		
    component.setProps({journal: {...component.props().journal, kind: 'live'}});
    expect(component.find('span').hasClass('badge-success')).toEqual(true);
    expect(component.find('span').hasClass('badge-primary')).toEqual(false);
		expect(component.find('span').hasClass('badge-secondary')).toEqual(false);

    component.setProps({journal: {...component.props().journal, kind: 'demo'}});
    expect(component.find('span').hasClass('badge-success')).toEqual(false);
    expect(component.find('span').hasClass('badge-primary')).toEqual(true);
		expect(component.find('span').hasClass('badge-secondary')).toEqual(false);

    component.setProps({journal: {...component.props().journal, kind: 'backtest'}});
    expect(component.find('span').hasClass('badge-success')).toEqual(false);
    expect(component.find('span').hasClass('badge-primary')).toEqual(false);
    expect(component.find('span').hasClass('badge-secondary')).toEqual(true);
	})
});