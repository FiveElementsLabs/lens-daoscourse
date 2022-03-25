import { gql } from '@apollo/client/core';
import ApolloClient from '../../lib/ApolloClient';
import { login } from '../authentication/login';

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`;

const updateProfileRequest = profileInfo => {
  return ApolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

export const updateProfile = async (address, profileMetaData) => {
  if (!profileMetaData.profileId) {
    throw new Error('No profile ID found');
  }

  console.log('update profile: address', address);

  await login(address);

  const { profileId, name, bio, location, website, twitterUrl } =
    profileMetaData;

  // Profile Metadata possible types
  // DOCS: https://docs.lens.dev/docs/update-profile
  // profileId: ProfileId!
  // name: string
  // bio: string
  // location: string
  // website: url
  // twitterUrl: url
  // coverPicture: url

  const res = await updateProfileRequest({
    profileId,
    name,
    bio,
    location,
    website,
    twitterUrl,
    coverPicture: null,
  });

  console.log('Updated profile id: ', res.data.updateProfile.id);
};
