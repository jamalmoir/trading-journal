import Types from 'Types'

export const inputControls: Types.InputControls = {
  instrument: {
    value: null,
    errors: [],
    touched: false,
    validationRules: {
      minLength: 2,
      notEmpty: true,
    },
  },
  strategy: {
    value: null,
    errors: [],
    touched: false,
    validationRules: {
      minLength: 2,
      notEmpty: true,
    },
  },
  kind: {
    value: 'long',
    errors: [],
    touched: false,
    validationRules: {},
  },
  entryDate: {
    value: null,
    errors: [],
    touched: false,
    validationRules: {},
  },
  entryPrice: {
    value: null,
    errors: [],
    touched: false,
    validationRules: {
      gt: 0,
    },
  },
  positionSize: {
    value: null,
    errors: [],
    touched: false,
    validationRules: {
      gt: 0,
    },
  },
  stopLoss: {
    value: null,
    errors: [],
    touched: false,
    validationRules: {
      gt: 0,
    },
  },
  takeProfit: {
    value: null,
    errors: [],
    touched: false,
    validationRules: {
      gt: 0,
    },
  },
}
