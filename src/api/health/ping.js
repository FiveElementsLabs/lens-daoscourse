import { gql } from '@apollo/client';
import ApolloClient from '../../lib/ApolloClient';
import { prettyJSON } from '../../lib/Helpers';

const GET_PING = `
  query {
    ping
  }
`;

const pingRequest = () => {
  return ApolloClient.query({
    query: gql(GET_PING),
  });
};

export const ping = async () => {
  const result = await pingRequest();
  prettyJSON('ping: ', result.data);

  return result.data;
};
