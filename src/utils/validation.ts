import Big from 'big.js'
import { isCurrencyCode } from '../utils/moolah'

export const validate = (
  val: any,
  rules: { [key: string]: any },
  connectedValue: any
) => {
  let errors: string[] = []

  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        if (!emailValidator(val)) {
          errors.push('Invalid email')
        }
        break
      case 'minLength':
        if (!minLengthValidator(val, rules[rule])) {
          errors.push('Too short')
        }
        break
      case 'maxLength':
        if (!maxLengthValidator(val, rules[rule])) {
          errors.push('Too Long')
        }
        break
      case 'equalTo':
        if (!equalToValidator(val, connectedValue[rule])) {
          errors.push('Invalid email')
        }
        break
      case 'notEmpty':
        if (!notEmptyValidator(val)) {
          errors.push("Can't be empty")
        }
        break
      case 'isNumber':
        if (!isNumberValidator(val)) {
          errors.push('Not a Number')
        }
        break
      case 'gt':
        if (!gtValidator(val, rules[rule])) {
          errors.push('Must be greater than ' + val)
        }
        break
      case 'gte':
        if (!gteValidator(val, rules[rule])) {
          errors.push('Must be greater than ' + val)
        }
        break
      case 'lt':
        if (!ltValidator(val, rules[rule])) {
          errors.push('Must be greater than ' + val)
        }
        break
      case 'lte':
        if (!lteValidator(val, rules[rule])) {
          errors.push('Must be greater than ' + val)
        }
        break
      case 'isCurrencyCode':
        if (!isCurrencyCodeValidator(val)) {
          errors.push('Must be greater than ' + val)
        }
        break
      default:
        errors = []
    }
  }

  return errors
}

const isValid = (errors: string[]) => errors.length === 0

const emailValidator = (val: string) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  )
}

const minLengthValidator = (val: string, minLength: number) =>
  val.length >= minLength
const maxLengthValidator = (val: string, maxLength: number) =>
  val.length <= maxLength
const equalToValidator = (val: string, checkValue: string) => val === checkValue
const notEmptyValidator = (val: string) => val.trim() !== ''
const isNumberValidator = (val: string) => !Number.isNaN(Number(val))
const gtValidator = (val: string, floor: number) =>
  !notEmptyValidator(val) || (isNumberValidator(val) && Big(val).gt(floor))
const gteValidator = (val: string, floor: number) =>
  !notEmptyValidator(val) || (isNumberValidator(val) && Big(val).gte(floor))
const ltValidator = (val: string, ceil: number) =>
  !notEmptyValidator(val) || (isNumberValidator(val) && Big(val).lt(ceil))
const lteValidator = (val: string, ceil: number) =>
  !notEmptyValidator(val) || (isNumberValidator(val) && Big(val).lte(ceil))
const isCurrencyCodeValidator = (val: string) =>
  !notEmptyValidator(val) || isCurrencyCode(val)
