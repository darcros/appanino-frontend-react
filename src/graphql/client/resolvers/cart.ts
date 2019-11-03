/* eslint-disable i18next/no-literal-string */

import {
  CartResolvers,
  CartMutationsResolvers,
  Resolver_CartDocument,
  Resolver_CartQuery,
  Resolver_CartItemQuantityFragment,
  Resolver_CartItemQuantityFragmentDoc,
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

    const data = cache.readFragment<Resolver_CartItemQuantityFragment>({
      fragment: Resolver_CartItemQuantityFragmentDoc,
      id: itemId,
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

    // find the CartItem associated with the productId
    const pos = items.findIndex(item => item.product.id === productId);

    const insertItem = () => {
      items.push({
        __typename: 'CartItem',
        id: `for-product-${productId}`,
        quantity,
        product: {
          __typename: 'Product',
          id: productId,
        },
      });
    };

    const updateItem = () => {
      items[pos] = {
        ...items[pos],
        quantity,
      };
    };

    const deleteItem = () => {
      // Even if the item is removed from the list it is still present in cache, and will be
      // retrieved by productQuantityInCart, so we need to ensure that it has the correct value
      const id = getCacheKey({ __typename: 'CartItem', id: items[pos].id });
      cache.writeFragment<Resolver_CartItemQuantityFragment>({
        fragment: Resolver_CartItemQuantityFragmentDoc,
        id,
        data: {
          __typename: 'CartItem',
          quantity,
        },
      });

      items.splice(pos, 1);
    };

    // delete item
    if (quantity === 0) {
      // no-op: delete item that doesn't exist
      if (pos === -1) return null;

      deleteItem();
    }
    // update or create item
    else {
      if (pos === -1) {
        insertItem();
      } else {
        updateItem();
      }
    }

    // save cart
    cache.writeQuery<Resolver_CartQuery>({
      query: Resolver_CartDocument,
      data: {
        cart: {
          __typename: 'Cart',
          items,
        },
      },
    });

    return null;
  },
};
