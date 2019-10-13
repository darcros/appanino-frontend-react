import React from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { QuantityInput } from './QuantityInput';

interface ProductListItemStyleProps {
  isQuantityInputExpanded: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ListItemTextRoot: (props: ProductListItemStyleProps) => ({
      // avoid overlap with <ListItemSecondaryAction>
      maxWidth: `calc(100% - ${props.isQuantityInputExpanded ? '144px' : '72px'})`,
    }),
    avatar: {
      // Make avatar square
      borderRadius: 0,
    },
    inline: {
      display: 'inline',
    },
  }),
);

interface ProductListItemProps {
  text: string;
  imageUrl: string;
  price: number;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({ text, imageUrl, price }) => {
  const { t } = useTranslation();

  // TODO: use Apollo to store cart items
  const [items, setItems] = React.useState(0);
  const classes = useStyles({ isQuantityInputExpanded: items > 0 });

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.avatar} alt={t('page.shop.product-image', { productName: text })} src={imageUrl} />
      </ListItemAvatar>
      <ListItemText
        classes={{ root: classes.ListItemTextRoot }}
        primary={text}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
              {`${price}€`}
            </Typography>
            {items > 1 && ` × ${items} = ${price * items}€`}
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction>
        <QuantityInput value={items} increment={() => setItems(items + 1)} decrement={() => setItems(items - 1)} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
