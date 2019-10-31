/* eslint-disable i18next/no-literal-string */

import { Resolvers } from 'apollo-client';

import { cartDefaults, CartQueryResolvers, CartMutationResolvers } from './cart';
import { AuthMutationResolvers } from './auth';

export const defaults = {
  ...cartDefaults,
};

const redirect = (typename: string) => {
  return () => ({
    __typename: typename,
  });
};

export const resolvers: Resolvers = {
  Query: {
    cart: redirect('Cart'),
  },
  Mutation: {
    cart: redirect('CartMutations'),
    auth: redirect('AuthMutations'),
  },
  Cart: CartQueryResolvers,
  CartMutations: CartMutationResolvers,
  AuthMutations: AuthMutationResolvers,
};
