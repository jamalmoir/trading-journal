import React, { useState } from 'react';
import Types from 'Types';
import { Heading } from '../components/Heading';
import { TextInput } from '../components/TextInput';
// import { Button } from '../components/Button';


interface PlaygroundProps {
}

export const Playground = (props: PlaygroundProps) => {
  const [textInputs, setTextInputs] = useState({
    one: '',
    two: '',
  });

  const onChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputs({...textInputs, one: event.target.value});
  }

  const onChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputs({...textInputs, two: event.target.value});
  }

  return (
    <div className="playground">
      <Heading text="The Component Playground" />
      <TextInput type="text" label="Text Input" value={ textInputs.one } onChange={ onChange1 }/>
      <TextInput type="text" label="Another Text Input" value={ textInputs.two } onChange={ onChange2 }/>
    </div>
  )
}