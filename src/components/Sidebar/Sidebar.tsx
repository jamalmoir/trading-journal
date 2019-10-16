import * as React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Types from 'Types'
import { unauthenticateUser } from '../../redux/actions/auth'
import './sidebar.scss'
import { TradeFilter } from '../TradeFilter'

interface SidebarProps {
  className?: string
  auth: any
  onUnauthenticateUser: () => null
}

export const SidebarComponent = (props: SidebarProps) => {
  return (
    <div
      className={'sidebar grid-x grid-margin-y grid-margin-x' + props.className}
    >
      <div className="sidebar-top cell">
        <Link className="logo navbar-brand menu-text" to="/">
          <img src="/public/stroply-logo-white.png" alt="Stroply" />
        </Link>
      </div>
      <div className="sidebar-content cell">
        <TradeFilter />
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
