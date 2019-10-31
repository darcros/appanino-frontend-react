import { saveToken as saveTokenToLocalStorage, removeToken } from '../token';
import { MutationResolvers } from '../../../generated/graphql';

export const AuthMutationResolvers: Pick<MutationResolvers, 'saveToken' | 'logOut'> = {
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
