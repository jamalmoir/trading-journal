import * as React from 'react'
import { Button, ButtonProps } from '../components/Button'
import { Heading } from '../components/Heading'
import { confirmAlert } from 'react-confirm-alert'

export const confirmDialogue = (
  title: string,
  message: string,
  buttonOneProps: ButtonProps,
  buttonTwoProps: ButtonProps
) => {
  const confirmOptions = {
    customUI: ({ onClose }: { onClose: () => void }) => {
      return (
        <div className="confirm-dialogue dark-gray grid-x grid-margin-y">
          <Heading text={title} className="cell" />
          <p className="cell">{message}</p>
          <div className="confirm-dialogue-buttons cell grid-x grid-margin-x">
            <Button
              {...buttonOneProps}
              className={buttonOneProps.className + ' cell small medium-6'}
              onClick={() => {
                buttonOneProps.onClick()
                onClose()
              }}
            />
            <Button
              {...buttonTwoProps}
              className={buttonTwoProps.className + ' cell small medium-6'}
              onClick={() => {
                buttonTwoProps.onClick()
                onClose()
              }}
            />
          </div>
        </div>
      )
    },
  }

  confirmAlert(confirmOptions)
}
