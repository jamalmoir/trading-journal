import React, { useState } from 'react'
import { Heading } from '../../components/Heading'
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import './playground.scss'
import { TristateCheckbox } from '../../components/TristateCheckbox'
import { SelectInput } from '../../components/SelectInput'

interface PlaygroundProps {}

export const Playground = (props: PlaygroundProps) => {
  const [textInputs, setTextInputs] = useState({
    one: '',
    two: '',
  })

  const onChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputs({ ...textInputs, one: event.target.value })
  }

  const onChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputs({ ...textInputs, two: event.target.value })
  }

  const [loading, setLoading] = useState({
    one: false,
    two: false,
  })
  const onClick1 = () => setLoading({ ...loading, one: !loading.one })
  const onClick2 = () => setLoading({ ...loading, two: !loading.two })

  const [selectInputs, setSelectInputs] = useState({
    one: '',
  })
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectInputs({ ...selectInputs, one: event.target.value })
  const choices = [
    { id: 'one', name: 'One' },
    { id: 'two', name: 'Two' },
    { id: 'three', name: 'Three' },
  ]

  return (
    <div className="playground">
      <Heading text="The Component Playground" />
      <TextInput
        type="text"
        label="Text Input"
        value={textInputs.one}
        onChange={onChange1}
      />
      <TextInput
        type="text"
        label="Another Text Input"
        value={textInputs.two}
        onChange={onChange2}
      />
      <Button
        text="Click me for Loading"
        onClick={onClick1}
        loading={loading.one}
      />
      <Button
        text="Disabled Button"
        onClick={onClick2}
        loading={loading.two}
        disabled={true}
      />
      <TristateCheckbox onClick={() => {}} />
      <SelectInput
        label="Select Something"
        value={selectInputs.one}
        choices={choices}
        onChange={onSelect}
      />
    </div>
  )
}