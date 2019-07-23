import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'typeface-roboto';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { Theme, createStyles, CssBaseline } from '@material-ui/core';
import theme from './theme';

import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';

import { PageContainer } from './components/PageContainer';
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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <div className={classes.root}>
          <DrawerAndNavbar />

          <PageContainer>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
          </PageContainer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
