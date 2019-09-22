/* eslint-disable i18next/no-literal-string */

import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

import { client } from './index';
import { getToken, removeToken } from './token';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  credentials: 'same-origin',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message, locations, path, extensions }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

      if (!extensions) return;
      switch (extensions.code) {
        case 'UNAUTHENTICATED':
        case 'FORBIDDEN':
          console.error('Token in probably expired: logging out');
          removeToken();
          await client.resetStore();
          client.writeData({
            data: {
              isLoggedIn: false,
            },
          });
          break;
      }
    });
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const link = ApolloLink.from([errorLink, authLink, httpLink]);
