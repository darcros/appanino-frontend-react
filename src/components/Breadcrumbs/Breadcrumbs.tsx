import React from 'react';
import { withRouter } from 'react-router';
import Box from '@material-ui/core/Box';
import MaterialBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { Home, Restaurant, AccountCircle } from '@material-ui/icons/';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

import { BreadcrumbsItem } from './BreadcrumbsItem';

const breadcrumbsMap: { [key: string]: { icon: React.ComponentType<SvgIconProps>; title: string } } = {
  // TODO: add other pages when I create them
  '/shop': {
    title: 'Shop',
    icon: Restaurant,
  },
  '/user': {
    title: 'User Settings',
    icon: AccountCircle,
  },
};

export const Breadcrumbs = withRouter(({ location }) => {
  const pathNames = location.pathname.split('/').filter(x => x);

  return (
    <Box mt={4}>
      <MaterialBreadcrumbs aria-label="breadcrumb">
        <BreadcrumbsItem href="/" icon={Home} title="Home" />
        {pathNames.map((_item, i) => {
          const last = i === pathNames.length - 1;
          const to = `/${pathNames.slice(0, i + 1).join('/')}`;
          const { icon, title } = breadcrumbsMap[to];

          return <BreadcrumbsItem key={i} href={last ? undefined : to} icon={icon} title={title} />;
        })}
      </MaterialBreadcrumbs>
    </Box>
  );
});
