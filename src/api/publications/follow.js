import { utils, ethers } from 'ethers';
import { gql } from '@apollo/client/core';
import { login } from '../authentication/login';
import ApolloClient from '../../lib/ApolloClient';
import { omit } from '../../lib/Helpers';
import { uploadIpfs } from '../../lib/ipfs';
import { LENS_HUB_CONTRACT } from '../../lib/ConfigVars';
import { LENS_HUB_ABI } from '../../lib/ABIs';

const FOLLOW_TYPED_DATA = `
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
 }
`;

const createFollowTypedData = createFollowTypedDataRequest => {
  return ApolloClient.mutate({
    mutation: gql(FOLLOW_TYPED_DATA),
    variables: {
      request: {
        follow: [createFollowTypedDataRequest],
      },
    },
  });
};

export const createFollow = async (signer, followMetaData) => {
  if (!followMetaData.profileId) {
    console.error('NO PROFILE ID');
  }

  const signedTypeData = async (domain, types, value) => {
    return await signer._signTypedData(
      omit(domain, '__typename'),
      omit(types, '__typename'),
      omit(value, '__typename')
    );
  };

  try {
    const address = await signer.getAddress();
    console.log('create follow: address', address);

    await login(address);

    // For more info about the complete IPFS upload object:
    // See lib/ipfs on this repo,
    // See this example: https://github.com/aave/lens-api-examples/blob/master/src/ipfs.ts
    // And see the docs: https://docs.lens.dev/docs/create-post-typed-data
    const ipfsResult = await uploadIpfs(followMetaData);
    console.log('create follow: ipfs result', ipfsResult);

    // NOTE: postMetaData.publicationId example: "0xc8-0x07"
    // We must include both the profile id and the post id.

    const createFollowRequest = {
      profile: followMetaData.profileId,
    };

    const result = await createFollowTypedData(createFollowRequest);
    console.log('create follow: createFollowTypedData', result);

    const typedData = result.data.createFollowTypedData.typedData;
    console.log('create follow: typedData', typedData);

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    console.log('create follow: signature', signature);

    const splitSignature = signature => {
      return utils.splitSignature(signature);
    };

    const { v, r, s } = splitSignature(signature);

    const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, await signer);
    console.log('before tx');
    console.log(address);
    console.log(typedData.value);
    console.log(typedData.value.datas);

    const tx = await lensHub.followWithSig({
      follower: address,
      profileIds: typedData.value.profileIds,
      datas: typedData.value.datas,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log('create follow: tx hash', tx.hash);
    return tx.hash;
  } catch (err) {
    console.error('ERROR: ', err?.message);
  }
};
