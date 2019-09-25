import * as React from 'react';
import './heading.scss';


interface HeadingProps {
  className?: string;
  text: string;
}

export const Heading = (props: HeadingProps) => {
  return (
    <h1 className={ 'Heading ' + props.className }>{ props.text }</h1>
  )
}