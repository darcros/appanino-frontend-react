import React, { Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Divider, List, Hidden, Drawer } from '@material-ui/core';
import { Restaurant, ShoppingCart, AttachMoney, RestaurantMenu, Fastfood, School, Settings } from '@material-ui/icons/';

import { ToolbarSpacer } from '../ToolbarSpacer';
import { DrawerListItem } from './DrawerListItem';
import { GetUserRoleComponent, Role } from '../../generated/graphql';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
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
  const classes = useStyles();

  const drawerContent = (
    <div>
      <ToolbarSpacer />
      <Divider />
      <List>
        <DrawerListItem onSelected={onClose} title="Shop" icon={Restaurant} page="/shop" />

        {/* TODO: create pages */}
        <DrawerListItem onSelected={onClose} title="Your orders" icon={ShoppingCart} page="#" />
        <DrawerListItem onSelected={onClose} title="Transactions" icon={AttachMoney} page="#" />
      </List>

      <GetUserRoleComponent>
        {({ data }) => {
          const isAdmin = data && data.userInfo && data.userInfo.role !== Role.User;
          console.log(data && data.userInfo && data.userInfo.role, Role.User);

          return isAdmin ? (
            <Fragment>
              <Divider />
              <List>
                <DrawerListItem onSelected={onClose} title="Orders" icon={RestaurantMenu} page="#" />
                <DrawerListItem onSelected={onClose} title="Products" icon={Fastfood} page="#" />
                <DrawerListItem onSelected={onClose} title="Schools" icon={School} page="#" />
                <DrawerListItem onSelected={onClose} title="Settings" icon={Settings} page="#" />
              </List>
            </Fragment>
          ) : null;
        }}
      </GetUserRoleComponent>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="Navigation drawer">
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
