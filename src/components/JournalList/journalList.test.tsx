
import * as React from 'react';
import { JournalList } from './JournalList';
import { shallow } from 'enzyme';
import { testJournals } from '../../utils/testHelpers';


describe("<JournalList />", () => {
  it('matches snapshot', () => {
    const component = shallow(<JournalList journals={ testJournals() }/>);
    expect(component).toMatchSnapshot();
  });
});