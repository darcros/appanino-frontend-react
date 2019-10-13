import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserRoleQuery } from '../generated/graphql';

interface LoggedInRouteProps extends RouteProps {
  component: React.ComponentType;
  loggedOut?: boolean;
  redirect?: string;
}

export const LoggedInRoute: React.FC<LoggedInRouteProps> = ({
  component: Component,
  loggedOut = false,
  redirect = '/',
  ...rest
}) => {
  const { data } = useUserRoleQuery();
  const isLoggedIn = !!(data && data.self);
  const canSee = loggedOut ? !isLoggedIn : isLoggedIn;

  return <Route {...rest} render={() => (canSee ? <Component /> : <Redirect to={redirect} />)} />;
};
