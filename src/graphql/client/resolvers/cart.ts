/* eslint-disable i18next/no-literal-string */

import gql from 'graphql-tag';
import {
  CartResolvers,
  CartMutationsResolvers,
  Resolver_CartDocument,
  Resolver_CartQuery,
} from '../../../generated/graphql';

export const cartDefaults = {
  cart: {
    __typename: 'Cart',
    items: [],
  },
};

export const CartQueryResolvers: Pick<CartResolvers, 'productQuantity'> = {
  productQuantity: (_root, { productId }, { cache, getCacheKey }) => {
    const itemId = getCacheKey({ __typename: 'CartItem', id: `for-product-${productId}` });

    // TODO: use code generator for types
    const data = cache.readFragment<{ __typename: 'CartItem'; quantity: number }>({
      id: itemId,
      fragment: gql`
        fragment CartItemQuantity on CartItem {
          quantity
        }
      `,
    });

    return (data && data.quantity) || 0;
  },
};

export const CartMutationResolvers: CartMutationsResolvers = {
  updateProductQuantity: async (_root, { productId, quantity: qty }, { cache, getCacheKey }) => {
    const quantity = Math.max(0, qty);

    // get cart
    const data = cache.readQuery<Resolver_CartQuery>({ query: Resolver_CartDocument });
    const items = (data && data.cart.items) || [];

    // update or create cart item
    const pos = items.findIndex(item => item.product.id === productId);
    if (pos === -1 && quantity > 0) {
      items.push({
        __typename: 'CartItem',
        id: `for-product-${productId}`,
        quantity,
        product: {
          __typename: 'Product',
          id: productId,
        },
      });
    } else {
      items[pos] = {
        ...items[pos],
        quantity,
      };
    }

    // remove items with 0 quantity
    const filtered = items.filter(item => item.quantity > 0);

    // save cart
    cache.writeQuery<Resolver_CartQuery>({
      query: Resolver_CartDocument,
      data: {
        cart: {
          __typename: 'Cart',
          items: filtered,
        },
      },
    });

    // update item
    // Even if the item is removed from the list it is still present in cache, and will be
    // retrieved by productQuantityInCart, so we need to ensure that it has the correct value
    if (pos > -1 && quantity === 0) {
      const id = getCacheKey({ __typename: 'CartItem', id: items[pos].id });
      cache.writeFragment<{ __typename: 'CartItem'; quantity: number }>({
        id,
        data: {
          __typename: 'CartItem',
          quantity,
        },
        fragment: gql`
          fragment CartItemQuantity on CartItem {
            quantity
          }
        `,
      });
    }

    return null;
  },
};