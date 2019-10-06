import * as React from 'react'
import { Heading } from './Heading'
import { shallow } from 'enzyme'

describe('<Heading />', () => {
  it('matches snapshot', () => {
    const component = shallow(<Heading text="Hello Test" />)
    expect(component).toMatchSnapshot()
  })
})
