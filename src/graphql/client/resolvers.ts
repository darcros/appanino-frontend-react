import jwtDecode from 'jwt-decode';
import { Resolvers } from 'apollo-client';

import { getToken, loggedIn, saveToken as saveTokenToLocalStorage, removeToken } from './token';
import { QueryResolvers, MutationResolvers, JwtUserInfo } from '../../generated/graphql';

const Query: Pick<QueryResolvers, 'isLoggedIn' | 'userInfo'> = {
  isLoggedIn: () => {
    return loggedIn();
  },
  userInfo: () => {
    const token = getToken();
    if (!token) return null;

    const data = jwtDecode<JwtUserInfo>(token);
    return {
      __typename: 'JwtUserInfo',
      ...data,
    };
  },
};

const Mutation: Pick<MutationResolvers, 'saveToken' | 'logOut'> = {
  saveToken: (_root, { token }, { cache }) => {
    saveTokenToLocalStorage(token);
    cache.writeData({
      data: { isLoggedIn: true },
    });
    return null;
  },
  // TODO: actually use this mutation
  logOut: (_root, _variables, { cache }) => {
    removeToken();
    cache.writeData({
      data: { isLoggedIn: false },
    });
    return null;
  },
};

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
