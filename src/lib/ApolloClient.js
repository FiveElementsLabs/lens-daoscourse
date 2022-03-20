import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuthenticationToken } from './State';
import { LENS_API_URL } from './ConfigVars';

// This is an utility to help Apollo client handle the auth middleware.
const httpLink = createHttpLink({
  uri: LENS_API_URL,
});

// This is the authentication middleware
// to inject the Auth header token in every query.
const authLink = setContext((_, { headers }) => {
  const token = getAuthenticationToken();

  return {
    headers: {
      ...headers,
      'x-access-token': token ? `Bearer ${token}` : '',
    },
  };
});

// This is the Apollo graphQL client config object.
const Client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default Client;
