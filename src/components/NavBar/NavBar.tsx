import React from 'react';

import { Link, match } from 'react-router-dom';
import './navBar.scss';
import {withRouter} from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';


interface NavBarProps {
}

export const NavBar = withRouter(props => {
	return (
		<div className='header'>
			{ /*<div className='header-image'></div> */ }

			<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
				<div className='content-wrapper navbar navbar-expand-lg navbar-dark bg-primary'>
					<Link className='navbar-brand' to='/'>Stroply</Link>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
    				<ul className="navbar-nav mr-auto">
      				<li className="nav-item">
								<Link to='/' className="nav-link">Overview</Link>
      				</li>
      				<li className="nav-item">
								<Link to='/' className="nav-link">Trades</Link>
      				</li>
      				<li className="nav-item">
								<Link to='/' className="nav-link">Analytics</Link>
      				</li>
      				<li className="nav-item">
								<Link to='/' className="nav-link">Chartbook</Link>
      				</li>
						</ul>
					</div>

				</div>
			</nav>

			<div className='header-breadcrumbs'>
				<div className='content-wrapper'>
					<Breadcrumbs />
				</div>
			</div>
		</div>
	)
})	