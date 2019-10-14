import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

// Context interface used in client-side resolvers
export interface Context {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
}
