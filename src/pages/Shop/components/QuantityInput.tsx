import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AddShoppingCart, Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    count: {
      width: '24px',
      textAlign: 'center',
    },
  }),
);

interface QuantityInputProps {
  value: number;
  increment: () => void;
  decrement: () => void;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({ value, increment, decrement }) => {
  const classes = useStyles();

  if (value === 0) {
    return (
      <IconButton aria-label="add to cart" onClick={increment}>
        <AddShoppingCart />
      </IconButton>
    );
  }

  return (
    <div className={classes.root}>
      <IconButton aria-label="remove" onClick={decrement}>
        <Remove />
      </IconButton>
      <Typography variant="h6" component="p" className={classes.count}>
        {value}
      </Typography>
      <IconButton aria-label="add" disabled={value >= 99} onClick={increment}>
        <Add />
      </IconButton>
    </div>
  );
};
