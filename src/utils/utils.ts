import { Tag } from "react-tag-autocomplete";
import { useState } from "react";
import Types from "Types";
import { validate } from "./validation";

export const stringsToTags = (strings: string[]): Tag[] => Array.isArray(strings) ? strings.map(s => ({id:s, name: s})) : [];

export const setUpControls = (initialControls: Types.InputControls): [Types.InputControls, (key: string, value: any) => void] => {
	const [controls, setControls]: [Types.InputControls, (controls: Types.InputControls) => void] = useState(initialControls);

	const updateControls = (key: string, value: any): void => {
		let connectedValue = {};

		if (key === null) {
			setControls(value);
			return
		}

		// equalTo rule requires a connectedValue to be compared to.
		if (controls[key].validationRules.equalTo) {
			const equalControl = controls[key].validationRules.equalTo;
			const equalValue = controls[equalControl].value;

			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}

		let newControls: Types.InputControls = {
			...controls,
			[key]: {
				...controls[key],
				value: value,
				errors: validate(value, controls[key].validationRules, connectedValue),
				touched: true
			}
		};

		setControls(newControls);
	}

	return [controls, updateControls]
}