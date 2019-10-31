/* eslint-disable i18next/no-literal-string */

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { link } from './link';
import { resolvers, defaults } from './resolvers';

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  resolvers,
  connectToDevTools: true,
});

const writeDefaults = () =>
  client.cache.writeData({
    data: { ...defaults },
  });

writeDefaults();
client.onResetStore(async () => writeDefaults());
