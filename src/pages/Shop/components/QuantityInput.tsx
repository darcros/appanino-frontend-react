import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

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
  const { t } = useTranslation();
  const classes = useStyles();

  if (value === 0) {
    return (
      <IconButton aria-label={t('page.shop.add-to-cart')} onClick={increment}>
        <AddShoppingCart />
      </IconButton>
    );
  }

  return (
    <div className={classes.root}>
      <IconButton aria-label={t('page.shop.add')} onClick={decrement}>
        <Remove />
      </IconButton>
      <Typography variant="h6" component="p" className={classes.count}>
        {value}
      </Typography>
      <IconButton aria-label={t('page.shop.remove')} disabled={value >= 99} onClick={increment}>
        <Add />
      </IconButton>
    </div>
  );
};
