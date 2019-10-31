import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { link } from './link';
import { resolvers } from './resolvers';

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  resolvers,
  connectToDevTools: true,
});

// Pre-populate cache
client.cache.writeData({
  data: {
    // initialize cart
    cart: [],
  },
});
