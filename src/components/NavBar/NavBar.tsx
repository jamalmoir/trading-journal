import * as React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import Types from 'Types'
import { unauthenticateUser } from '../../redux/actions/auth'
import { Breadcrumbs } from '../Breadcrumbs'
import './navBar.scss'
import { Button } from '../Button'

interface NavBarProps {
  auth: any
  onUnauthenticateUser: () => null
}

export const NavBarComponent = (props: NavBarProps) => {
  return (
    <div className="header">
      <nav className="top-bar">
        <div className="top-bar-left">
          <ul className="navbar-nav menu">
            <Link className="logo navbar-brand menu-text" to="/">
              <img src="/public/stroply-logo-white.png" alt="Stroply" />
            </Link>
            {/*<li className="nav-item">
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
						</li>*/}
          </ul>
        </div>

        <div className="top-bar-right">
          {props.auth.uid ? (
            <Button
              className="logout-button top-bar-right"
              text="Logout"
              onClick={props.onUnauthenticateUser}
            />
          ) : null}
        </div>
      </nav>

      <div className="header-breadcrumbs">
        <div className="content-wrapper">
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
}

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  // @ts-ignore
  onUnauthenticateUser: () => dispatch(unauthenticateUser()),
})

// @ts-ignore
export const NavBar = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBarComponent)
)
