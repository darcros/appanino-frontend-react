/* eslint-disable i18next/no-literal-string */

import { Resolvers } from 'apollo-client';

import { cartDefaults, CartBaseQueryResolvers, CartQueryResolvers, CartMutationResolvers } from './cart';
import { AuthMutationResolvers } from './auth';

export const defaults = {
  ...cartDefaults,
};

export const resolvers: Resolvers = {
  Query: {
    ...CartBaseQueryResolvers,
  },
  Mutation: {
    ...AuthMutationResolvers,
    ...CartMutationResolvers,
  },
  Cart: CartQueryResolvers,
};
