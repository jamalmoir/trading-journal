import * as React from 'react';
import { ChangeEvent } from 'react';
import './textInput.scss';


interface TextInputProps {
  type: 'text' | 'email' | 'password' | 'number';
  placeholder: string;
  value: string;
  errors?: string[];
  touched?: boolean;
  className?: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  const errorClass = props.errors && props.errors.length && props.touched ? 'errors' : '';

  return (
    <input id={ props.id }
           className={ props.className + ' text-input form-control ' + errorClass }
           type={ props.type }
           placeholder={ props.placeholder }
           value={ props.value }
           onChange={ props.onChange }>
    </input>
  )
}