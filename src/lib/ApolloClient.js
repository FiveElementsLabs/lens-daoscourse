import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LENS_API_URL } from './ConfigVars';

// This is the Apollo graphQL client config object.
const Client = new ApolloClient({
  uri: LENS_API_URL,
  cache: new InMemoryCache(),
});

export default Client;
