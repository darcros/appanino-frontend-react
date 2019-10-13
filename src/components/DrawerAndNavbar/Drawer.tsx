import React, { Fragment } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

import Restaurant from '@material-ui/icons/Restaurant';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AttachMoney from '@material-ui/icons/AttachMoney';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import Fastfood from '@material-ui/icons/Fastfood';
import School from '@material-ui/icons/School';
import Settings from '@material-ui/icons/Settings';

import { ToolbarSpacer } from '../ToolbarSpacer';
import { DrawerListItem } from './DrawerListItem';
import { GetUserRoleComponent, Role } from '../../generated/graphql';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      // eslint-disable-next-line i18next/no-literal-string
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }),
);

interface SideDrawerProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ mobileOpen, onClose }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const drawerContent = (
    <div>
      <ToolbarSpacer />
      <Divider />
      <List>
        <DrawerListItem onSelected={onClose} title={t('page.shop.drawer-entry')} icon={Restaurant} page="/shop" />

        {/* TODO: create pages */}
        <DrawerListItem
          onSelected={onClose}
          title={t('page.user-orders.drawer-entry')}
          icon={ShoppingCart}
          page="/my-orders"
        />
        <DrawerListItem
          onSelected={onClose}
          title={t('page.transactions.drawer-entry')}
          icon={AttachMoney}
          page="/transactions"
        />
      </List>

      <GetUserRoleComponent>
        {({ data }) => {
          const isAdmin = data && data.userInfo && data.userInfo.role !== Role.User;

          return isAdmin ? (
            <Fragment>
              <Divider />
              <List>
                <DrawerListItem
                  onSelected={onClose}
                  title={t('page.orders.drawer-entry')}
                  icon={RestaurantMenu}
                  page="/orders"
                />
                <DrawerListItem
                  onSelected={onClose}
                  title={t('page.products.drawer-entry')}
                  icon={Fastfood}
                  page="/products"
                />
                <DrawerListItem
                  onSelected={onClose}
                  title={t('page.schools.drawer-entry')}
                  icon={School}
                  page="/drawer"
                />
                <DrawerListItem
                  onSelected={onClose}
                  title={t('page.settings.drawer-entry')}
                  icon={Settings}
                  page="/settings"
                />
              </List>
            </Fragment>
          ) : null;
        }}
      </GetUserRoleComponent>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label={t('component.drawer.drawer-aria-label')}>
      {/* Mobile drawer */}
      <Hidden smUp implementation="js">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Desktop drawer */}
      <Hidden xsDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  );
};
