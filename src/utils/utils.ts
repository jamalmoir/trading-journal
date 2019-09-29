import { Tag } from "react-tag-autocomplete";
import { useState } from "react";
import Types from "Types";
import { validate } from "./validation";
import { Money } from "./moolah";
import Big from 'big.js';

export const stringsToTags = (strings: string[]): Tag[] => Array.isArray(strings) ? strings.map(s => ({id:s, name: s})) : [];

export const setUpControls = (initialControls: Types.InputControls): [Types.InputControls, (key: string, value: any) => boolean] => {
	const [controls, setControls]: [Types.InputControls, (controls: Types.InputControls) => void] = useState(initialControls);

	const updateControls = (key: string, value: any): boolean => {
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

		return controlsValid(newControls);
	}

	return [controls, updateControls]
}

export const controlsValid = (controls: Types.InputControls) => Object.keys(controls).map(key => controls[key].errors.length).every(v => !v);

export const buildTrade = (args: any): Types.Trade => ({
	id: args.id || null,
	journalId: args.journal.id,
	created: new Date(args.created) || null,
	modified: new Date(args.modified) || null,
	instrument: args.instrument || null,
	strategy: args.strategy || null,
	kind: args.kind || null,
	entryDate: args.entryDate ? new Date(args.entryDate) : null,
	entryPrice: args.entryPrice ? new Big(args.entryPrice) : null,
	positionSize: args.positionSize ? new Big(args.positionSize) : null,
	stopLoss: args.stopLoss ? new Big(args.stopLoss) : null,
	takeProfit: args.takeProfit ? new Big(args.takeProfit) : null,
	exitDate: args.exitDate ? new Date(args.exitDate) : null,
	exitPrice: args.exitPrice ? new Big(args.exitPrice) : null,
	fees: args.fees ? new Money(args.fees, args.journal.currency) : null,
	pl: args.pl ? new Money(args.pl, args.journal.currency) : null,
	mfe: args.mfe ? new Big(args.mfe) : null,
	mae: args.mae ? new Big(args.mae) : null,
	hitTakeProfit: args.hitTakeProfit || null,
	tags: args.tags || [],
	entryComment: args.entryComment || '',
	duringComment: args.duringComment || '',
	exitComment: args.exitComment || '',
	flag: args.flag || false,
	entryEmotion: args.entryEmotion || [],
	exitEmotion: args.exitEmotion || [],
	rating: args.rating || null,
	charts: args.charts || [],
});

export const uniqueId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
