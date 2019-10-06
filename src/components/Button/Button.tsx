import * as React from 'react'
import './button.scss'

interface ButtonProps {
  text: string
  onClick: () => void
  loading?: boolean
  disabled?: boolean
  className?: string
  id?: string
}

export const Button = (props: ButtonProps) => {
  const handleClick = () => props.onClick()

  const getClasses = () => {
    let classes = props.className || ''

    classes = props.loading ? classes + ' loading' : classes
    classes = props.disabled ? classes + ' disabled ' : classes

    return classes
  }

  return (
    <button
      id={props.id}
      className={'button ' + getClasses()}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.text}
      {props.loading ? (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
    </button>
  )
}
