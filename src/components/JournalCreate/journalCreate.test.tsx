import * as React from 'react';
import { JournalCreateComponent } from './JournalCreate';
import { shallow } from 'enzyme';
import Types from 'Types';


describe("<JournalCreate />", () => {
  it('matches snapshot', () => {
		const onCreateJournal = jest.fn();
    const component = shallow(<JournalCreateComponent onCreateJournal={ onCreateJournal } auth={ {} }/>);
    expect(component).toMatchSnapshot();
	});

  it('calls onCreateJournal with the right arguments', () => {
		const onCreateJournal = jest.fn();
		const component = shallow(<JournalCreateComponent onCreateJournal={ onCreateJournal } auth={ {} }/>);
		const name = 'Test Journal';
		const kind = 'demo';
		const currency = 'GBP';
		const expectedJournal: Types.Journal = {
			id: null,
			userId: null,
			created: null,
			modified: null,
			name: name,
			kind:kind,
			currency: currency,
			tradeCount: null,
		}

		component.find('.journal-create-name').simulate('change', {target: {value: name}});
		component.find('.journal-create-kind').simulate('change', {target: {value: kind}});
		component.find('.journal-create-currency').simulate('change', {target: {value: currency}});
		component.find('button').simulate('click');

		expect(JSON.stringify(onCreateJournal.mock.calls[0][0]) === JSON.stringify(expectedJournal))
	});
});