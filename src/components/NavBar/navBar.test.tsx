import * as React from 'react'
import { NavBarComponent } from './NavBar'
import { shallow } from 'enzyme'

describe('<NavBar />', () => {
  it('matches snapshot', () => {
    const onUnauthenticateUser = jest.fn()
    const component = shallow(
      <NavBarComponent auth={{}} onUnauthenticateUser={onUnauthenticateUser} />
    )
    expect(component).toMatchSnapshot()
  })

  it('calls onUnauthenticate user when the logout button is clicked', () => {
    const onUnauthenticateUser = jest.fn()
    const component = shallow(
      <NavBarComponent auth={{}} onUnauthenticateUser={onUnauthenticateUser} />
    )
    component.find('button').simulate('click')
    expect(onUnauthenticateUser).toBeCalledTimes(1)
  })
})
