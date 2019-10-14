import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoggedInRoute } from './components/LoggedInRoute';

import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { client } from './graphql/client';

import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { Center } from './components/Center';
import CircularProgress from '@material-ui/core/CircularProgress';

import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUpPage } from './pages/SignUp/SignUpPage';
import { UserSettingsPage } from './pages/UserSettings/UserSettingsPage';
import { ShopPage } from './pages/Shop/ShopPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { DrawerAndNavbar } from './components/DrawerAndNavbar';

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
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

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
                  <Route path="/" exact component={HomePage} />
                  <LoggedInRoute loggedOut path="/login" exact component={LoginPage} />
                  <LoggedInRoute loggedOut path="/sign-up" exact component={SignUpPage} />

                  <LoggedInRoute path="/user" exact component={UserSettingsPage} />
                  <LoggedInRoute path="/shop" component={ShopPage} />

                  <Route component={NotFoundPage} />
                </Switch>
              </React.Suspense>
            </Router>
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
