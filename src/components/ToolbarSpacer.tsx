import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  }),
);

export const ToolbarSpacer: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.toolbar} />;
};
