import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoggedInRoute } from './components/LoggedInRoute';

import { ApolloProvider } from 'react-apollo';
import { client } from './graphql/client';

import 'typeface-roboto';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { Theme, createStyles, CssBaseline } from '@material-ui/core';
import theme from './theme';

import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { ShopPage } from './pages/Shop/ShopPage';

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
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Router>
            <DrawerAndNavbar />

            <LoggedInRoute loggedOut redirect="/shop" path="/" exact component={HomePage} />
            <LoggedInRoute loggedOut path="/login" exact component={LoginPage} />

            <LoggedInRoute path="/shop" component={ShopPage} />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
