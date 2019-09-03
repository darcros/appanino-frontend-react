import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button, { ButtonProps } from '@material-ui/core/Button';

import { green } from '@material-ui/core/colors';

const useStyles = makeStyles<Theme, { fullWidth: boolean }>(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    width: props => (props.fullWidth ? 'auto' : 'fit-content'),
    height: 'fit-content',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: props => (props.fullWidth ? -6 : -12),
    marginLeft: -12,
  },
}));

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, disabled, fullWidth, children, ...props }) => {
  const classes = useStyles({ fullWidth: !!fullWidth });

  return (
    <div className={classes.wrapper}>
      <Button {...props} disabled={disabled || loading} fullWidth={fullWidth}>
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};
