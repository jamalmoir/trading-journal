import * as React from 'react';
import { useState } from 'react';
import './tristateCheckbox.scss';


interface TristateCheckboxProps {
	className?: string;
	id?: string;
	onClick?: (val: boolean | null) => void;
	initial?: boolean | null;
}

const stateMap = new Map([[null, true], [true, false], [false, null]]);
const stateClassMap = new Map([[null, 'unchecked'], [true, 'checked-true'], [false, 'checked-false']]);


export const TristateCheckbox = (props: TristateCheckboxProps) => {
	const initialState = typeof props.initial !== 'undefined'  ? props.initial : null;
	const [checked, setChecked] = useState(initialState)
	const [checkedClass, setCheckedClass] = useState(stateClassMap.get(initialState));

	let handleClick = () => {
		let nextState = stateMap.get(checked);
		setChecked(nextState);
		setCheckedClass(stateClassMap.get(nextState));
		props.onClick(nextState);
	}

	return (
		<div id={ props.id }
				 className={ props.className + ' tristate-checkbox ' + checkedClass }
				 onClick={ handleClick }>
		</div>
	)
}