import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface DrawerListItemProps {
  page: string;
  title: string;
  icon: React.ComponentType;
  onSelected: () => void;
}

type props = DrawerListItemProps & RouteComponentProps;

const DrawerListItemInternal: React.FC<props> = ({ title, icon: Icon, page, location, onSelected }) => (
  <ListItem button onClick={onSelected} component={RouterLink} to={page} selected={location.pathname.startsWith(page)}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

export const DrawerListItem = withRouter(DrawerListItemInternal);
