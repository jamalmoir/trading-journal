import * as React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { Dispatch } from 'redux'
import Types from 'Types'
import { Heading } from '../../components/Heading'
import { JournalCreate } from '../../components/JournalCreate/JournalCreate'
import { JournalList } from '../../components/JournalList'
import { routeChange } from '../../redux/actions/app'
import { JournalAction } from '../../redux/reducers/journal'
import './journals.scss'
import { HorizontalNav } from '../../components/HorizontalNav'

interface JournalsProps {
  journals: Types.Journal[]
  match: match
  onRouteChange: (route: any) => null
}

export const JournalsPage = (props: JournalsProps) => {
  props.onRouteChange(props.match)

  return (
    <div className="journals">
      <HorizontalNav />

      <div className="content-wrapper">
        <Heading className="journals-heading" text="Journals" />

        <JournalCreate />
        <JournalList className="journal-list" journals={props.journals} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    journals: state.journal.journals,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
  // @ts-ignore
  onRouteChange: (route: any) => dispatch(routeChange(location)),
})

export const Journals = connect(
  mapStateToProps,
  mapDispatchToProps
)(JournalsPage)
