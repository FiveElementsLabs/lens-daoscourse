import { gql } from '@apollo/client/core';
import ApolloClient from '../../lib/ApolloClient';
import { login } from '../authentication/login';
// import { prettyJSON } from '../../lib/Helpers';

const GET_PROFILES = `
  query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

const getProfilesRequest = request => {
  return ApolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
  });
};

export const getProfiles = async (address, signer) => {
  // console.log('profiles of: address', address);

  await login(address, signer);

  const request = { ownedBy: address };

  const profilesFromProfileIds = await getProfilesRequest(request);

  // prettyJSON('profiles: result', profilesFromProfileIds.data);

  return profilesFromProfileIds.data;
};
