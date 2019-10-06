import * as React from 'react'
import { BreadcrumbsComponent } from './Breadcrumbs'
import { shallow } from 'enzyme'
import { testJournals } from '../../utils/testHelpers'

describe('<Breadcrumbs />', () => {
  it('matches snapshot', () => {
    const component = shallow(
      <BreadcrumbsComponent route={null} activeJournal={testJournals()[0]} />
    )
    expect(component).toMatchSnapshot()
  })
})
