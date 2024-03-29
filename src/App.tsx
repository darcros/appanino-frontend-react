import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { client } from './graphql/client';

import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import CircularProgress from '@material-ui/core/CircularProgress';

import { LoggedInRoute } from './components/LoggedInRoute';
import { Center } from './components/Center';
import { DrawerAndNavbar } from './components/DrawerAndNavbar';

import { Cart } from './context/cart';

import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUpPage } from './pages/SignUp/SignUpPage';
import { UserSettingsPage } from './pages/UserSettings/UserSettingsPage';
import { ShopPage } from './pages/Shop/ShopPage';
import { CartPage } from './pages/Cart/CartPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <ThemeProvider theme={theme}>
            <Cart.Provider>
              <Router>
                <React.Suspense
                  // TODO: add an actual splash screen
                  fallback={
                    <Center>
                      <CircularProgress />
                    </Center>
                  }
                >
                  <DrawerAndNavbar />

                  <Switch>
                    <LoggedInRoute loggedOut path="/" redirect="/shop" exact component={HomePage} />
                    <LoggedInRoute loggedOut path="/login" redirect="/shop" exact component={LoginPage} />
                    <LoggedInRoute loggedOut path="/sign-up" redirect="/shop" exact component={SignUpPage} />

                    <LoggedInRoute path="/user" exact component={UserSettingsPage} />
                    <LoggedInRoute path="/shop" component={ShopPage} />
                    <LoggedInRoute path="/cart" component={CartPage} />

                    <Route component={NotFoundPage} />
                  </Switch>
                </React.Suspense>
              </Router>
            </Cart.Provider>
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
