import * as React from 'react';
import { TradeList } from './TradeList';
import { shallow } from 'enzyme';
import { testTrades } from '../../utils/testHelpers';


describe("<TradeList />", () => {
  it('matches snapshot', () => {
    const component = shallow(<TradeList trades={ testTrades() } />);
    expect(component).toMatchSnapshot();
	});
});
