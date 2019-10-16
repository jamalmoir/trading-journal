import * as React from 'react'
import { HorizontalNavComponent } from './HorizontalNav'
import { shallow } from 'enzyme'

describe('<HorizontalNav />', () => {
  it('matches snapshot', () => {
    const onUnauthenticateUser = jest.fn()
    const component = shallow(
      <HorizontalNavComponent
        auth={{}}
        onUnauthenticateUser={onUnauthenticateUser}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it('calls onUnauthenticate user when the logout button is clicked', () => {
    const onUnauthenticateUser = jest.fn()
    const component = shallow(
      <HorizontalNavComponent
        auth={{}}
        onUnauthenticateUser={onUnauthenticateUser}
      />
    )
    component.find('button').simulate('click')
    expect(onUnauthenticateUser).toBeCalledTimes(1)
  })
})
