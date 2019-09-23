import * as React from 'react';
import { TextInput } from './TextInput';
import { shallow } from 'enzyme';


describe("<TextInput />", () => {
  it('matches snapshot', () => {
    const component = shallow(<TextInput type='text' placeholder='test' value='test' />);
    expect(component).toMatchSnapshot();
  });

  it('handles input change', () => {
    const onChange = jest.fn();
    const component = shallow(<TextInput type='text' placeholder='test' value='test' onChange={ onChange } />);

    expect(onChange).not.toBeCalled();

    // enter text
    component.find('input[type="text"]').simulate('change', { target: { value: 'Hello' } })
    expect(onChange).toBeCalled();
  });

  it('has an errors class if conditions are met', () => {
    const component = shallow(<TextInput type='text' placeholder='test' value='test' />);

    // not touched, no errors
    component.setProps({touched: false, errors: []})
    expect(component.hasClass('errors')).toEqual(false);

    // not touched, errors
    component.setProps({touched: false, errors: ['an error']})
    expect(component.hasClass('errors')).toEqual(false);

    // touched, no errors
    component.setProps({touched: true, errors: []})
    expect(component.hasClass('errors')).toEqual(false);

    // touched, errors
    component.setProps({touched: true, errors: ['an error']})
    expect(component.hasClass('errors')).toEqual(true);
  });
});