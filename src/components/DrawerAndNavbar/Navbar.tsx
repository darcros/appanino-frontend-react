import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // Put navbar over the side drawer
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),

      // Hide when showing fixed drawer on big screens
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface NavbarProps {
  loggedIn: boolean;
  onMenuButtonClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ loggedIn, onMenuButtonClick }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {loggedIn && (
          <IconButton
            onClick={onMenuButtonClick}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          Appanino
        </Typography>
        {loggedIn ? (
          <IconButton component={RouterLink} to="/user/" edge="end" color="inherit" aria-label="Account">
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <Button component={RouterLink} to="/login/" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
