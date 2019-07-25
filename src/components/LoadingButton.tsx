import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';

import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -6,
    marginLeft: -12,
  },
}));

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, disabled, children, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button {...props} disabled={disabled || loading}>
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};
