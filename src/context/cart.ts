import React from 'react';
import { createContainer } from 'unstated-next';

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const useCart = () => {
  const [state, setState] = React.useState<{ [productId: string]: CartItem }>({});
  const items: CartItem[] = Object.values(state).filter(item => item.quantity > 0);

  const getQuantity = (productId: string): number => {
    const item = state[productId];
    return item ? item.quantity : 0;
  };

  const updateItem = (item: CartItem) => {
    setState({
      ...state,
      [item.product.id]: item,
    });
  };

  const empty = () => setState({});

  return { items, getQuantity, updateItem, empty };
};

export const Cart = createContainer(useCart);
