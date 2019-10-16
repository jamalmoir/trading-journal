import * as React from 'react'
import { uniqueId } from '../../utils/utils'
import './dateInput.scss'
import ReactDatePicker from 'react-datepicker'

interface DateInputProps {
  label?: string
  value: string | Date
  errors?: string[]
  touched?: boolean
  className?: string
  id?: string
  onChange?: (date: Date) => void
}

export const DateInput = (props: DateInputProps) => {
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

  const handleChange = (date: Date) => props.onChange(date)

  return (
    <div id={props.id} className={'date-input ' + getClasses()}>
      <label htmlFor={ID}>{props.label}</label>
      <ReactDatePicker
        id={ID}
        onChange={d => handleChange(d)}
        placeholderText="Entry Date"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  )
}
