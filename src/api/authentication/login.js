import { gql } from '@apollo/client';
import ApolloClient from '../../lib/ApolloClient';
import { prettyJSON } from '../../lib/Helpers';
import { getAddress, signText } from 'ethers/lib/utils';
import {
  getAuthenticationToken,
  setAuthenticationToken,
} from '../../lib/State';

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = address => {
  return ApolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address, signature) => {
  return ApolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const login = async (address = getAddress()) => {
  if (getAuthenticationToken()) {
    console.log('login: already logged in');
    return;
  }

  // We request a challenge from the server.
  const challengeResponse = await generateChallenge(address);
  console.log('CHALLENGE GENERATED');

  // We sign the text with the wallet.
  const signature = await signText(challengeResponse.data.challenge.text);
  console.log('SIGNATURE OBTAINED');

  const accessTokens = await authenticate(address, signature);
  prettyJSON('login result: ', accessTokens.data);

  setAuthenticationToken(accessTokens.data.authenticate.accessToken);

  return accessTokens.data;
};
