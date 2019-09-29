import * as React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import './textInput.scss';
import { uniqueId } from '../../utils/utils';


interface TextInputProps {
  type: 'text' | 'email' | 'password' | 'number';
  label: string;
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

    classes = props.value ? classes + ' has-value' : classes;
    classes = props.errors && props.errors.length && props.touched ? classes + ' errors' : classes;

    return classes
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event);

  return (
    <div id={ props.id } className={ 'text-input ' + getClasses() }>
      <label htmlFor={ ID }>{ props.label }</label>
      <input id={ ID }
             type={ props.type }
             value={ props.value }
             onChange={ handleChange }>
      </input>
    </div>
  )
}