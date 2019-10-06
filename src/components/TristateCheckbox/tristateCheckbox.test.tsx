import * as React from 'react'
import { TristateCheckbox } from './TristateCheckbox'
import { shallow } from 'enzyme'

describe('<TristateCheckbox />', () => {
  it('matches snapshot', () => {
    const component = shallow(<TristateCheckbox />)
    expect(component).toMatchSnapshot()
  })
})
