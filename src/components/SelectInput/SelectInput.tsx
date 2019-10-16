import * as React from 'react'
import { ChangeEvent } from 'react'
import { uniqueId } from '../../utils/utils'
import './selectInput.scss'

interface SelectInputProps {
  label?: string
  value: string | number
  choices: { id: string | number; name: string }[]
  placeholder?: string
  errors?: string[]
  touched?: boolean
  className?: string
  id?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectInput = (props: SelectInputProps) => {
  const ID = uniqueId()

  const getClasses = () => {
    let classes = props.className || ''

    classes =
      props.errors && props.errors.length && props.touched
        ? classes + ' errors'
        : classes
    classes = props.value ? classes + ' has-value' : classes

    return classes
  }

  const getOptions = () =>
    props.choices.map(choice => (
      <option value={choice.id}>{choice.name}</option>
    ))

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    props.onChange(event)

  return (
    <div id={props.id} className={'select-input ' + getClasses()}>
      <label htmlFor={ID}>{props.label}</label>
      <select
        id={ID}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
      >
        <option hidden disabled selected></option>
        {getOptions()}
      </select>
    </div>
  )
}
