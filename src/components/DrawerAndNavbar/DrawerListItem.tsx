import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

interface DrawerListItemProps {
  page: string;
  title: string;
  icon: React.ComponentType;
}

type props = DrawerListItemProps & RouteComponentProps;

const DrawerListItemInternal: React.FC<props> = ({ title, icon: Icon, page, location }) => (
  <ListItem button component={RouterLink} to={page} selected={location.pathname.startsWith(page)}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

export const DrawerListItem = withRouter(DrawerListItemInternal);