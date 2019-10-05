import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Types from 'Types';
import { createJournal } from '../../redux/actions/journal';
import { JournalAction } from '../../redux/reducers/journal';
import { TextInput } from '../TextInput';
import { setUpControls } from '../../utils/utils';
import './journalCreate.scss';
import { Button } from '../Button';
import { SelectInput } from '../SelectInput';


interface JournalCreateProps {
	className?: string;
	onCreateJournal: (journal: Types.Journal) => null;
	auth: any,
}

export const JournalCreateComponent = (props: JournalCreateProps) => {
	const [controlsValid, setControlsValid] = useState(false);
	const [controls, setControls] = setUpControls({
		name: {
			value: '',
			errors: [],
			touched: false,
			validationRules: {
				minLength: 2,
				notEmpty: true,
			}
		},
		kind: {
			value: '',
			errors: [],
			touched: false,
			validationRules: {
				minLength: 2,
				notEmpty: true,
			}
		},
		currency: {
			value: '',
			errors: [],
			touched: false,
			validationRules: {
				notEmpty: true,
				minLength: 3,
				maxLength: 3,
				isCurrencyCode: true,
			}
		},
	});

	const kindChoices = [
		{id: 'live', name: 'Live'},
		{id: 'demo', name: 'Demo'},
		{id: 'backtest', name: 'Backtest'},
	]

	const updateControls = (kind: string, value: any) => {
		setControlsValid(setControls(kind, value));
	}

	const createJournal = () => {
		let journal: Types.Journal = {
			id: null,
			userId: props.auth.uid,
			kind: controls.kind.value,
			currency: controls.currency.value,
			name: controls.name.value,
			created: new Date(),
			modified: new Date(),
			tradeCount: 0,
		}
		props.onCreateJournal(journal);
		setControls('name', '');
		setControls('kind', '');
		setControls('currency', '');
	}

	return (
		<div className={ props.className + ' journal-create row mb-3'}>
			<TextInput 	type="text"
						className="journal-create-name col-4"
						label="Journal name"
						placeholder="My Journal"
						value={ controls.name.value || '' }
						onChange={ (e) => updateControls('name', e.target.value) }
						errors={ controls.name.errors }
						touched={ controls.name.touched }
			/>
			<SelectInput 	label="Kind"
							className="journal-create-kind col-3"
							placeholder="live"
							value={ controls.kind.value }
							onChange={ (e) => updateControls('kind', e.target.value as 'live' | 'demo' | 'backtest') }
							errors={ controls.kind.errors }
							touched={ controls.kind.touched }
							choices={ kindChoices } />
			<TextInput type="text"
							className="journal-create-currency col-3"
							label="Currency"
							placeholder="USD"
							value={ controls.currency.value || '' }
							onChange={ (e) => updateControls('currency', e.target.value) }
							errors={ controls.currency.errors }
							touched={ controls.currency.touched }
			/>
			<Button text="Create"
							className="journal-create-button float-right"
							onClick={ createJournal }
							disabled={ !controlsValid || !controls.name.value || !controls.kind.value || !controls.currency.value } />
		</div>
	)
};

const mapStateToProps = (state: Types.RootState) => {
	return {
		auth: state.firebase.auth,
	}
};

const mapDispatchToProps = (dispatch: Dispatch<JournalAction>) => ({
	// @ts-ignore
	onCreateJournal: (journal: Types.Journal) => dispatch(createJournal(journal)),
});

export const JournalCreate = connect(mapStateToProps, mapDispatchToProps)(JournalCreateComponent);