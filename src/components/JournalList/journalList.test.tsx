
import * as React from 'react';
import { JournalList } from './JournalList';
import { shallow } from 'enzyme';
import Types from 'Types';


describe("<JournalList />", () => {
  it('should match snapshot', () => {
		const journals: Types.Journal[] = [
			{
				id: 'someId',
				userId: 'someUserId',
				kind: 'live',
				currency: 'GBP',
				name: 'Some Journal',
				created: new Date('2019/09/10'),
				modified: new Date('2019/09/10'),
				tradeCount: 10,
			},
			{
				id: 'someId2',
				userId: 'someUserId',
				kind: 'demo',
				currency: 'JPY',
				name: 'Some Journal2',
				created: new Date('2019/09/11'),
				modified: new Date('2019/09/11'),
				tradeCount: 22,
			},
		];
    const component = shallow(<JournalList journals={ journals }/>);
    expect(component).toMatchSnapshot();
  });
});