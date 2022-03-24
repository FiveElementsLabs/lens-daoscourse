import { gql } from '@apollo/client';
import ApolloClient from '../../lib/ApolloClient';
import { prettyJSON } from '../../lib/Helpers';
import { getAuthenticationToken, setAuthenticationToken } from '../../lib/State';
import { checkJwtExpiration } from '../../lib/Helpers';

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

export const login = async (address, signer) => {
  if (getAuthenticationToken() && checkJwtExpiration) {
    return {
      message: 'Already logged in',
      token: getAuthenticationToken(),
    };
  }

  // We request a challenge from the server.
  const challengeResponse = await generateChallenge(address);

  // We sign the text with the wallet.
  const signature = await signer.signMessage(challengeResponse.data.challenge.text);

  const accessTokens = await authenticate(address, signature);
  prettyJSON('login result: ', accessTokens.data);

  setAuthenticationToken(accessTokens.data.authenticate.accessToken);

  return {
    message: 'Login successful',
    token: accessTokens.data.authenticate.accessToken,
  };
};
