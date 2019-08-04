import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Types from 'Types';


type RouteProps = React.ComponentProps<typeof Route>;

interface ProtectedRouteProps extends RouteProps {
  auth: any;
}

let protectedRoute = ({component: Component, auth, ...rest}: ProtectedRouteProps) => {
  return (
    <Route
      { ...rest }
      render={
        (props) => auth.uid
          ? <Component { ...props } />
          : <Redirect to={ {pathname: '/login', state: {from: props.location}} } />
      }
    />
  )
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    auth: state.firebase.auth,
  }
}

export const ProtectedRoute = connect(mapStateToProps)(protectedRoute);