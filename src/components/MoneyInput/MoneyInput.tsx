import React, { useState } from 'react';
import './textInput.scss';
import { Money, CurrencyCode, isCurrencyCode } from '../../utils/moolah';


interface TextInputProps {
  errors?: boolean;
  className?: string;
  id?: string;
  onChange?: (money: Money) => void;
}

export const TextInput = (props: TextInputProps) => {
  const [amount, setAmount]: [string | null, (amount: string) => void] = useState(null);
  const [currency, setCurrency]: [CurrencyCode | null, (currency: CurrencyCode) => void] = useState(null);

  let errorClass = props.errors ? 'errors' : '';

  let handleAmountChange = (val: string) => {
    if (isCurrencyCode(val)) {
      setAmount(val);
      props.onChange(new Money(val, currency));
    }
  }

  let handleCurrencyChange = (val: string) => {
    if (isCurrencyCode(val)) {
      setCurrency(val);
      props.onChange(new Money(amount, val));
    }
  }

  return (
    <div className="input-group">
      <input id={ props.id }
            className={ props.className + ' text-input form-control ' + errorClass }
            type='text'
            placeholder='Amount'
            value={ amount }
            onChange={ (e) => handleAmountChange(e.target.value) }>
      </input>
      <select className="trade-filter custom-select"
              value={ currency === null ? '' : currency }
              onChange={ (e) => handleCurrencyChange(e.target.value) }>
        <option value="" disabled>Currency</option>
        <option value="USD">USD</option>
        <option value="JPY">JPY</option>
      </select>
    </div>
  )
}