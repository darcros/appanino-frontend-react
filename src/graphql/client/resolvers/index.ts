/* eslint-disable i18next/no-literal-string */

import { Resolvers } from 'apollo-client';

import { AuthMutationResolvers } from './auth';

export const defaults = {};

const redirect = (typename: string) => {
  return () => ({
    __typename: typename,
  });
};

export const resolvers: Resolvers = {
  Mutation: {
    auth: redirect('AuthMutations'),
  },
  AuthMutations: AuthMutationResolvers,
};
