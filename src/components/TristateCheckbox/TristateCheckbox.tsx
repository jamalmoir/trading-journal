import React, { useState } from 'react';
import './tristateCheckbox.scss';


interface TristateCheckboxProps {
  className?: string;
  id?: string;
  onClick?: (val: boolean | null) => void;
}

const stateMap = new Map([[null, true], [true, false], [false, null]]);
const stateClassMap = new Map([[null, 'unchecked'], [true, 'checked-true'], [false, 'checked-false']]);


export const TristateCheckbox = (props: TristateCheckboxProps) => {
  let [checked, setChecked] = useState(null)
  let [checkedClass, setCheckedClass] = useState(stateClassMap.get(checked));

  let handleClick = () => {
    setChecked(stateMap.get(checked));
    setCheckedClass(stateClassMap.get(checked))
    
    props.onClick(checked);
  }

  return (
    <div id={ props.id }
         className={ props.className + ' tristate-checkbox ' + checkedClass }
         onClick={ handleClick }>
      
    </div>
  )
}