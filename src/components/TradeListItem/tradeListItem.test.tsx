import * as React from 'react';
import { TradeListItem } from './TradeListItem';
import { shallow } from 'enzyme';
import { testTrades } from '../../utils/testHelpers';


describe("<TradeListItem />", () => {
  it('matches snapshot', () => {
    const component = shallow(<TradeListItem trade={ testTrades()[0] } />);
    expect(component).toMatchSnapshot();
	});
});
