import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%', // calc(100vh - 160px)
    },
  }),
);

// TODO: move to global components folder
export const Center: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
