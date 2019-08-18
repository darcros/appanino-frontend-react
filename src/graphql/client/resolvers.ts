import jwtDecode from 'jwt-decode';
import { getToken, loggedIn } from './token';

export const resolvers = {
  Query: {
    isLoggedIn() {
      return loggedIn();
    },
    userInfo() {
      const token = getToken();
      if (!token) return null;

      const data = jwtDecode(token);
      return {
        __typename: 'JwtUserInfo',
        ...data,
      };
    },
  },
};
