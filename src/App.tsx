import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'typeface-roboto';
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { Navbar } from './components/Navbar';
import { SideDrawer } from './components/Drawer';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div className={classes.root}>
        <Navbar onMenuButtonClick={handleDrawerToggle} />
        <SideDrawer mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
      </div>
    </Router>
  );
};

export default App;
