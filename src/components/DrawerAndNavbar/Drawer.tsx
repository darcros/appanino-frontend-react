import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Divider, List, Hidden, Drawer } from '@material-ui/core';
import { Restaurant, ShoppingCart, AttachMoney, RestaurantMenu, Fastfood, School, Settings } from '@material-ui/icons/';

import { ToolbarSpacer } from '../ToolbarSpacer';
import { DrawerListItem } from './DrawerListItem';

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

  const drawer = (
    <div>
      <ToolbarSpacer />
      <Divider />
      <List>
        <DrawerListItem title="Shop" icon={Restaurant} page="/shop" />

        {/* TODO: create pages */}
        <DrawerListItem title="Your orders" icon={ShoppingCart} page="#" />
        <DrawerListItem title="Transactions" icon={AttachMoney} page="#" />
      </List>
      <Divider />
      <List>
        <DrawerListItem title="Orders" icon={RestaurantMenu} page="#" />
        <DrawerListItem title="Products" icon={Fastfood} page="#" />
        <DrawerListItem title="Schools" icon={School} page="#" />
        <DrawerListItem title="Settings" icon={Settings} page="#" />
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="Mailbox folders">
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
          {drawer}
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
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};
