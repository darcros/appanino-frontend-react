import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { loggedIn } from './token';
import { link } from './link';
import { resolvers } from './resolvers';

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  resolvers,
});

// Pre-populate cache
client.writeData({
  data: {
    isLoggedIn: loggedIn(),
  },
});
