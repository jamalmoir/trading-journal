import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import Types from 'Types';
import { unauthenticateUser } from '../../redux/actions/auth';
import { Breadcrumbs } from '../Breadcrumbs';
import './navBar.scss';

interface NavBarProps {
	auth: any,
	onUnauthenticateUser: () => null,
}

const NavBarComponent = (props: NavBarProps) => {
	return (
		<div className='header'>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className='content-wrapper navbar navbar-expand-lg navbar-dark bg-dark justify-content-between'>
					<Link className='navbar-brand logo' to='/'>
    				<img src="/src/images/stroply-logo-white.png" alt="Stroply" />
					</Link>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
    				<ul className="navbar-nav mr-auto">
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
						
						<button className="logout-button btn btn-outline-secondary my-2 my-lg-0"
										onClick={ props.onUnauthenticateUser }>Logout</button>
						
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
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    auth: state.firebase.auth,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  // @ts-ignore
  onUnauthenticateUser: () => dispatch(unauthenticateUser()),
});

// @ts-ignore
export const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarComponent));