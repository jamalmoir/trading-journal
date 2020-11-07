import * as React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Types from 'Types'
import { unauthenticateUser } from '../../redux/actions/auth'
import './sidebar.scss'
import { TradeFilter } from '../TradeFilter'

interface SidebarProps {
	className?: string
	components?: React.Component[]
  auth: any
  onUnauthenticateUser: () => null
}

export const SidebarComponent = (props: SidebarProps) => {
  return (
    <div
      className={'sidebar grid-x' + props.className}
    >
      <div className="sidebar-top cell">
        <Link className="logo navbar-brand menu-text" to="/">
          <img src="/public/stroply-logo-white.png" alt="Stroply" />
        </Link>
      </div>
      <div className="sidebar-content cell">
				<div className="sidebar-links grid-x text-center">
					<Link className="cell" to="/">
						Journals
					</Link>
					<Link className="cell" to="">
						Overview (Coming Soon!)
					</Link>
					<Link className="cell" to="">
						Chartbook (Coming Soon!)
					</Link>
					<Link className="cell" to="/" onClick={props.onUnauthenticateUser}>
						Logout
        	</Link>
				</div>
				<hr />
				{props.components}
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  // @ts-ignore
  onUnauthenticateUser: () => dispatch(unauthenticateUser()),
})

export const Sidebar = withRouter(
  // @ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidebarComponent)
)
