import React, { Fragment } from 'react';

import { IsLoggedInComponent } from '../../generated/graphql';

import { Navbar } from './Navbar';
import { SideDrawer } from './Drawer';

export const DrawerAndNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <IsLoggedInComponent>
      {({ data }) => {
        const loggedIn = !!(data && data.isLoggedIn);
        console.log(loggedIn);

        return (
          <Fragment>
            <Navbar loggedIn={loggedIn} onMenuButtonClick={handleDrawerToggle} />
            {loggedIn && <SideDrawer mobileOpen={mobileOpen} onClose={handleDrawerToggle} />}
          </Fragment>
        );
      }}
    </IsLoggedInComponent>
  );
};
