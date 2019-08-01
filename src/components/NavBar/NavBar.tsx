import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import './navBar.scss';

interface NavBarProps {}

export const NavBar = withRouter((props: NavBarProps) => {
	return (
		<div className='header'>
			{ /*<div className='header-image'></div> */ }

			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className='content-wrapper navbar navbar-expand-lg navbar-dark bg-dark'>
					<Link className='navbar-brand logo' to='/'>
    				<img src="/src/images/stroply-logo-white.png" alt="Stroply" />
					</Link>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
    				<ul className="navbar-nav">
      				<li className="nav-item">
								<Link to='/' className="nav-link header-link">Overview</Link>
      				</li>
      				<li className="nav-item">
								<Link to='/' className="nav-link header-link">Trades</Link>
      				</li>
      				<li className="nav-item">
								<Link to='/' className="nav-link header-link">Analytics</Link>
      				</li>
      				<li className="nav-item">
								<Link to='/' className="nav-link header-link">Chartbook</Link>
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