import * as React from 'react';
import Types from 'Types';
import './journalCard.scss';
import { Button } from '../Button';


interface JournalCardProps {
  className?: string;
  journal: Types.Journal;
}

export const JournalCard = (props: JournalCardProps) => {
  const getBadgeType = () => {
    if (props.journal.kind === 'live') return 'badge-success';
    if (props.journal.kind === 'demo') return 'badge-primary';

    return 'badge-secondary';
  }

  return (
    <div className={ props.className + ' journal-card card'}>

      <div className="card-body">
        <div className="journal-card-chart">P&L Chart</div>
        <div className="journal-card-header">
          { props.journal.name }
        </div>

        <div className="journal-card-body">
          <div className="journal-card-details">
            <div className={ "journal-card-kind badge badle-pill " + getBadgeType() }>{ props.journal.kind }</div>
            <div className="journal-card-currency">{ props.journal.currency } Journal</div>
          </div>

          <div className="journal-card-stats">
            <div className="stat">
              <div className="stat-name">Win Rate:</div>
              <div className="stat-val">---</div>
            </div>
            <div className="stat">
              <div className="stat-name">Avg. Reward/Risk:</div>
              <div className="stat-val">---</div>
            </div>
          </div>
        </div>
      </div>

      <div className="journal-card-footer card-footer">
        <div className="journal-card-footer-buttons row">
          <Button className="col-md-5 journal-card-edit" text="Edit" onClick={ ()=>{} } />
          <Button className="col-md-5 journal-card-delete" text="Delete" onClick={ ()=>{} } />
        </div>
      </div>
    </div>
  )
}