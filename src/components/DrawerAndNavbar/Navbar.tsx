import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Slide from '@material-ui/core/Slide';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { useCartQuantitiesQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // Put navbar over the side drawer
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),

      // Hide when showing fixed drawer on big screens
      // eslint-disable-next-line i18next/no-literal-string
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
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();

  const { data } = useCartQuantitiesQuery();
  const items = (data && data.cart.items) || [];
  const total = items.reduce((tot, item) => item.quantity + tot, 0);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Slide direction="right" in={location.pathname !== '/'} mountOnEnter unmountOnExit>
          {loggedIn ? (
            <IconButton
              onClick={onMenuButtonClick}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label={t('component.navbar.menu-aria-label')}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              component={RouterLink}
              to="/"
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label={t('component.navbar.back-button-aria-label')}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Slide>
        <Typography variant="h6" className={classes.title}>
          {t('appanino')}
        </Typography>
        {loggedIn ? (
          <React.Fragment>
            <IconButton
              component={RouterLink}
              to="/cart/"
              edge="end"
              color="inherit"
              aria-label={t('component.navbar.cart-button-aria-label')}
            >
              <Badge badgeContent={total} max={10} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              component={RouterLink}
              to="/user/"
              edge="end"
              color="inherit"
              aria-label={t('component.navbar.account-button-aria-label')}
            >
              <AccountCircleIcon />
            </IconButton>
          </React.Fragment>
        ) : (
          <Button component={RouterLink} to="/login/" color="inherit">
            {t('action.login')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
