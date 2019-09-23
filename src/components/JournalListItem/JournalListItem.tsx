import * as React from 'react';
import { Link } from 'react-router-dom';
import Types from 'Types';
import './journalListItem.scss';


interface JournalListProps {
  className?: string;
  journal: Types.Journal;
}

export const JournalListItem = (props: JournalListProps) => {
  let getBadgeType = () => {
    if (props.journal.kind === 'live') return 'badge-success';
    if (props.journal.kind === 'demo') return 'badge-primary';

    return 'badge-secondary';
  }

  return (
    <Link to={ 'journal/' + props.journal.id } className={ 'journal-list-item ' + props.className }>
      { props.journal.name }
      <span className={ "journal-list-item-kind badge badle-pill " + getBadgeType() }>{ props.journal.kind }</span>
      <i className="journal-list-item-edit far fa-edit"></i>
    </Link>
  )
}