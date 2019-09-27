import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Types from 'Types';
import { createJournal } from '../../redux/actions/journal';
import { JournalAction } from '../../redux/reducers/journal';
import { TextInput } from '../TextInput';
import { setUpControls } from '../../utils/utils';


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
			value: 'live',
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
		setControls('kind', 'live');
		setControls('currency', '');
	}

	return (
		<div className={ props.className + ' input-group mb-3'}>
			<TextInput type="text"
							className="journal-create-name form-control col-8"
							placeholder="Journal name"
							value={ controls.name.value || '' }
							onChange={ (e) => updateControls('name', e.target.value) }
							errors={ controls.name.errors }
							touched={ controls.name.touched }
			/>
			<select className="journal-create-kind form-control custom-select col-4"
							value={ controls.kind.value || 'live' }
							onChange={ (e) => updateControls('kind', e.target.value as 'live' | 'demo' | 'backtest') }
			>
				<option value="live">Live</option>
				<option value="demo">Demo</option>
				<option value="backtest">Backtest</option>
			</select>
			<TextInput type="text"
							className="journal-create-currency form-control col-8"
							placeholder="Currency"
							value={ controls.currency.value || '' }
							onChange={ (e) => updateControls('currency', e.target.value) }
							errors={ controls.currency.errors }
							touched={ controls.currency.touched }
			/>
			<div className="input-group-append">
				<button className="btn btn-outline-primary"
								type="button"
								onClick={ createJournal }
								disabled={ !controlsValid }>Create</button>
			</div>
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