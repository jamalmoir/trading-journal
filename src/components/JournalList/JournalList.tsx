import * as React from 'react'
import Types from 'Types'
import './journalList.scss'
import { JournalCard } from '../JournalCard'

interface JournalListProps {
  className?: string
  journals: Types.Journal[]
}

const buildRows = (journals: Types.Journal[]) => {
  let rows = []

  for (let journal of journals) {
    rows.push(
      <JournalCard
        key={journal.id}
        journal={journal}
        className="cell small medium-4 large-4"
      />
    )
  }

  return rows
}

export const JournalList = (props: JournalListProps) => {
  return (
    <div
      className={
        'journal-list grid-x grid-margin-y grid-margin-x ' + props.className
      }
    >
      {buildRows(props.journals)}
    </div>
  )
}
