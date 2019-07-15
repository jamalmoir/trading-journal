import React from 'react';

import { Link } from 'react-router-dom';
import styles from './navBar.scss';

interface NavBarProps {
}

export const NavBar = (props: NavBarProps) => {
  return (
    <div className={ styles.navBar + ' navbar navbar-expand-lg navbar-light bg-light'}>
      <div className='content-wrapper'>
        <Link className='navbar-brand' to='/'>WEBEDGE</Link>
      </div>
    </div>
  )
}