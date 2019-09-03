import { InMemoryCache } from 'apollo-cache-inmemory';

// Context interface used in client-side resolvers
export interface Context {
  cache: InMemoryCache;
}
