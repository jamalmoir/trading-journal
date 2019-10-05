import * as React from 'react';
import { useState } from 'react';
import Types from 'Types';
import './journalCard.scss';
import { Button } from '../Button';
import { setUpControls } from '../../utils/utils';
import { TextInput } from '../TextInput';
import { SelectInput } from '../SelectInput';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { JournalAction } from '../../redux/reducers/journal';
import { modifyJournal } from '../../redux/actions/journal';
import { deleteJournal } from '../../redux/actions/journal';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';


interface JournalCardProps {
  className?: string;
	journal: Types.Journal;
	onModifyJournal: (journal: Types.Journal) => void;
	onDeleteJournal: (journal: Types.Journal) => void;
}

export const JournalCardComponent = (props: JournalCardProps) => {
  const [editMode, setEditMode] = useState(false);
	const [controlsValid, setControlsValid] = useState(false);
	const [controls, setControls] = setUpControls({
		name: {
			value: props.journal.name,
			errors: [],
			touched: false,
			validationRules: {
				minLength: 2,
				notEmpty: true,
			}
		},
		kind: {
			value: props.journal.kind,
			errors: [],
			touched: false,
			validationRules: {
				minLength: 2,
				notEmpty: true,
			}
		},
	});

	const kindChoices = [
		{id: 'live', name: 'Live'},
		{id: 'demo', name: 'Demo'},
		{id: 'backtest', name: 'Backtest'},
	]

	const chartData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
		datasets: [
			{
				label: 'P&L',
				fill: true,
				data: [0, 100, 200, 400, 600, 500, 900, 1000, 800, 1100, 1300, 1200],
				pointBackgroundColor: '#5AB8D4'
			}
		]
	}

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			xAxes: [{display: false}],
			yAxes: [{display: false}],
		}
	}

  const getBadgeType = () => {
    if (props.journal.kind === 'live') return 'badge-success';
    if (props.journal.kind === 'demo') return 'badge-primary';

    return 'badge-secondary';
  }

  const getButtonGroup = () => {
    return editMode
    ? <div className="journal-card-footer-buttons row">
        <Button className="col-md-5 journal-card-cancel" text="Cancel" onClick={ handleEditClick } />
        <Button className="col-md-5 journal-card-save" text="Save" onClick={ handleEditSaveClick } disabled={ controlsValid } />
      </div>
    : <div className="journal-card-footer-buttons row">
        <Button className="col-md-5 journal-card-edit" text="Edit" onClick={ handleEditClick } />
        <Button className="col-md-5 journal-card-delete" text="Delete" onClick={ handleDeleteClick } />
      </div>
  }

	const updateControls = (kind: string, value: any) => {
		setControlsValid(setControls(kind, value));
	}

  const handleEditClick = () => {
    setEditMode(!editMode);
  }

  const handleEditSaveClick = () => {
		if (controlsValid) {
			const newJournal: Types.Journal = {
				...props.journal,
				name: controls.name.value,
				kind: controls.kind.value,
			};

			props.onModifyJournal(newJournal);
    	setEditMode(!editMode);
		}
  }

  const handleDeleteClick = () => {
		// TODO: confirmation
		props.onDeleteJournal(props.journal);
  }

  return (
    <div className={ props.className + ' journal-card card'}>

      <div className="card-body">
    		<Link to={ 'journal/' + props.journal.id }>
					<div className="journal-card-chart">
						<Line data={ chartData } options={ chartOptions }/>
					</div>
				
					<div className="journal-card-header">
						{ editMode
							? <TextInput type="text"
											className="journal-card-name-edit"
											label="Journal name"
											value={ controls.name.value || '' }
											onChange={ (e) => updateControls('name', e.target.value) }
											errors={ controls.name.errors }
											touched={ controls.name.touched }
								/>
							: props.journal.name
						}
					</div>

					<div className="journal-card-body">
						<div className="journal-card-details">
							{ editMode
								? <SelectInput 	label="Kind"
																className="journal-card-kind-edit"
																placeholder="live"
																value={ controls.kind.value }
																onChange={ (e) => updateControls('kind', e.target.value as 'live' | 'demo' | 'backtest') }
																errors={ controls.kind.errors }
																touched={ controls.kind.touched }
																choices={ kindChoices }
									/>
								: <div className={ "journal-card-kind badge badle-pill " + getBadgeType() }>{ props.journal.kind }</div>
							}
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
				</Link>
				</div>

      <div className="journal-card-footer card-footer">
        { getButtonGroup() }
      </div>
    </div>
  )
}

const mapStateToProps = (state: Types.RootState) => ({
	journalState: state.journal,
});

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
// @ts-ignore
	onModifyJournal: (journal: Types.Journal) => dispatch(modifyJournal(journal)),
// @ts-ignore
	onDeleteJournal: (journal: Types.Journal) => dispatch(deleteJournal(journal)),
});

// @ts-ignore
export const JournalCard = connect(mapStateToProps, mapDispatchToProps)(JournalCardComponent);