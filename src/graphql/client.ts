import ApolloClient from 'apollo-boost';

const loggedIn = () => !!localStorage.getItem('token');

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  resolvers: {
    Query: {
      isLoggedIn() {
        return loggedIn();
      },
    },
  },
});

// Pre-populate cache
client.writeData({
  data: {
    isLoggedIn: loggedIn(),
  },
});
