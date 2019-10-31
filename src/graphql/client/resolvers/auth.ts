import { saveToken as saveTokenToLocalStorage, removeToken } from '../token';
import { AuthMutationsResolvers } from '../../../generated/graphql';

export const AuthMutationResolvers: AuthMutationsResolvers = {
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
