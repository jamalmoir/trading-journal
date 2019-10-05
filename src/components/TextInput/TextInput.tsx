import * as React from 'react';
import { ChangeEvent } from 'react';
import { uniqueId } from '../../utils/utils';
import './textInput.scss';


interface TextInputProps {
  type: 'text' | 'email' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  value: string;
  errors?: string[];
  touched?: boolean;
  className?: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  const ID = uniqueId();

  const getClasses = () => {
    let classes = props.className || '';

    classes = props.errors && props.errors.length && props.touched ? classes + ' errors' : classes;
    classes = props.value ? classes + ' has-value' : classes;
    classes = props.label ? classes + ' has-label' : classes;

    return classes
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event);

  return (
    <div id={ props.id } className={ 'text-input ' + getClasses() }>
      <label htmlFor={ ID }>{ props.label }</label>
      <input id={ ID }
             type={ props.type }
             value={ props.value }
             placeholder={ props.placeholder }
             onChange={ handleChange }>
      </input>
    </div>
  )
}