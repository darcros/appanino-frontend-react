import { Resolvers } from 'apollo-client';

import { saveToken as saveTokenToLocalStorage, removeToken } from './token';
import { MutationResolvers } from '../../generated/graphql';

const Mutation: Pick<MutationResolvers, 'saveToken' | 'logOut'> = {
  saveToken: (_root, { token }, { cache }) => {
    saveTokenToLocalStorage(token);
    cache.writeData({
      data: { isLoggedIn: true },
    });
    return null;
  },
  logOut: async (_root, _variables, { cache }) => {
    removeToken();
    await cache.reset();
    cache.writeData({
      data: { isLoggedIn: false },
    });
    return null;
  },
};

export const resolvers: Resolvers = {
  Query: {},
  Mutation,
};
