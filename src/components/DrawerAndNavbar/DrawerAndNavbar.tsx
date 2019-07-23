import React, { Fragment } from 'react';

import { Navbar } from './Navbar';
import { SideDrawer } from './Drawer';

export const DrawerAndNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Fragment>
      <Navbar onMenuButtonClick={handleDrawerToggle} />
      <SideDrawer mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
    </Fragment>
  );
};
