import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'typeface-roboto';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { Theme, createStyles, CssBaseline } from '@material-ui/core';
import theme from './theme';

import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <DrawerAndNavbar />

          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
