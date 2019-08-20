import React from 'react';
import Types from 'Types';
import { JournalListItem } from '../JournalListItem';
import './journalList.scss';


interface JournalListProps {
  className: string;
  journals: Types.Journal[];
}

const buildRows = (journals: Types.Journal[]) => {
  let rows = [];

  for (let journal of journals) {
    rows.push(<JournalListItem key={ journal.id } journal={ journal } />)
  }

  return rows;
}

export const JournalList = (props: JournalListProps) => {
  return (
    <div className={ 'journal-list ' + props.className }>
      { buildRows(props.journals) }
    </div>
  )
}