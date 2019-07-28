import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IsLoggedInComponent } from '../generated/graphql';

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
}) => (
  <Route
    {...rest}
    render={() => (
      <IsLoggedInComponent>
        {({ data }) => {
          const isLoggedIn = data ? data.isLoggedIn : false;
          const condition = loggedOut ? !isLoggedIn : isLoggedIn;

          return condition ? <Component /> : <Redirect to={redirect} />;
        }}
      </IsLoggedInComponent>
    )}
  />
);
