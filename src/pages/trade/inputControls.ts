import Types from 'Types';

export const inputControls: Types.InputControls = {
	instrument: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			minLength: 2,
			notEmpty: true,
		}
	},
	strategy: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			minLength: 2,
			notEmpty: true,
		}
	},
	kind: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	flag: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	tags: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	entryDate: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	entryPrice: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			gt: 0,
		}
	},
	positionSize: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			gt: 0,
		}
	},
	stopLoss: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			gt: 0,
		}
	},
	takeProfit: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			gt: 0,
		}
	},
	entryEmotion: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	exitDate: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	exitPrice: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			gt: 0,
		}
	},
	fees: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			isNumber: true,
		}
	},
	pl: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			isNumber: true,
		}
	},
	rating: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	exitEmotion: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	hitTakeProfit: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
		}
	},
	mfe: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			gt: 0,
		}
	},
	mae: {
		value: null,
		errors: [],
		touched: false,
		validationRules: {
			gt: 0,
		}
	},
}