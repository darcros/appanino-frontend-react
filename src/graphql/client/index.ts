/* eslint-disable i18next/no-literal-string */

import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { link } from './link';
import { resolvers, defaults } from './resolvers';

const schema = gql`
  type CartItem {
    id: ID!
    quantity: Int!
    product: Product!
  }

  type Cart {
    # Returns all items that are in cart
    items: [CartItem!]!
    # Returns quantity of a product.
    # Retunrns a quantity of 0 if the product is not in the cart.
    productQuantity(productId: ID!): Int!
  }

  extend type Query {
    cart: Cart!
  }

  type CartMutations {
    # Updates the quantity of a certain item in the cart.
    # If the item did not exist it will be created.
    updateProductQuantity(productId: ID!, quantity: Int!): Boolean
  }

  type AuthMutations {
    saveToken(token: String!): Boolean
    logOut: Boolean
  }

  extend type Mutation {
    cart: CartMutations!
    auth: AuthMutations!
  }
`;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  resolvers,
  connectToDevTools: true,
  typeDefs: schema,
});

const writeDefaults = () =>
  client.cache.writeData({
    data: { ...defaults },
  });

writeDefaults();
client.onResetStore(async () => writeDefaults());
