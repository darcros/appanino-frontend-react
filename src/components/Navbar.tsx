import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Appanino
          </Typography>
          <Button component={RouterLink} to="/login/" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
