import { Resolvers } from 'apollo-client';

import { saveToken as saveTokenToLocalStorage, removeToken } from './token';
import { MutationResolvers } from '../../generated/graphql';

const Mutation: Pick<MutationResolvers, 'saveToken' | 'logOut'> = {
  saveToken: (_root, { token }, _context) => {
    saveTokenToLocalStorage(token);
    return null;
  },
  logOut: async (_root, _variables, { client }) => {
    removeToken();
    await client.resetStore();
    return null;
  },
};

export const resolvers: Resolvers = {
  Query: {},
  Mutation,
};
