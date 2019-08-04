import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core';
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
  // TODO: use Apollo to store cart items
  const [items, setItems] = React.useState(0);
  const classes = useStyles({ isQuantityInputExpanded: items > 0 });

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.avatar} alt="Image of product" src={imageUrl} />
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
