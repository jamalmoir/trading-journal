import * as React from 'react'
import { SidebarComponent } from './Sidebar'
import { shallow } from 'enzyme'

describe('<Sidebar />', () => {
  it('matches snapshot', () => {
    const onUnauthenticateUser = jest.fn()
    const component = shallow(
      <SidebarComponent auth={{}} onUnauthenticateUser={onUnauthenticateUser} />
    )
    expect(component).toMatchSnapshot()
  })

  it('calls onUnauthenticate user when the logout button is clicked', () => {
    const onUnauthenticateUser = jest.fn()
    const component = shallow(
      <SidebarComponent auth={{}} onUnauthenticateUser={onUnauthenticateUser} />
    )
    component.find('button').simulate('click')
    expect(onUnauthenticateUser).toBeCalledTimes(1)
  })
})
