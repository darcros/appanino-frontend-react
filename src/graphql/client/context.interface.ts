import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

interface getCacheKeyParameters {
  __typename: string;
  id: string;
}

// Context interface used in client-side resolvers
export interface Context {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
  getCacheKey: ({ __typename, id }: getCacheKeyParameters) => string;
}
