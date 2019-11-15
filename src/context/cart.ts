import React from 'react';
import { createContainer } from 'unstated-next';

export interface CartItem {
  product: {
    id: String;
    name: String;
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
      [item.product.id as string]: item,
    });
  };

  return { items, getQuantity, updateItem };
};

export const Cart = createContainer(useCart);
