import React, { Fragment } from 'react';

import { useUserRoleQuery, Role } from '../../generated/graphql';

import { Navbar } from './Navbar';
import { SideDrawer } from './Drawer';

export const DrawerAndNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const { data } = useUserRoleQuery();
  const role = data && data.self && data.self.role;
  const loggedIn = !!role;

  return (
    <Fragment>
      <Navbar loggedIn={loggedIn} onMenuButtonClick={handleDrawerToggle} />
      {loggedIn && <SideDrawer isAdmin={role !== Role.User} mobileOpen={mobileOpen} onClose={handleDrawerToggle} />}
    </Fragment>
  );
};
