import { ApolloClient, inMemoryCache } from '@apollo/client';

const LENS_API_URL = 'https://api-mumbai.lens.dev/';

// This is the Apollo graphQL client config object.
const Client = ApolloClient({
  uri: LENS_API_URL,
  cache: inMemoryCache(),
});

export default Client;
