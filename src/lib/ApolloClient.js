import { ApolloClient, InMemoryCache } from '@apollo/client';

const LENS_API_URL = 'https://api-mumbai.lens.dev/';

// This is the Apollo graphQL client config object.
const Client = new ApolloClient({
  uri: LENS_API_URL,
  cache: new InMemoryCache(),
});

export default Client;
