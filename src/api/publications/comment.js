import { utils, ethers } from 'ethers';
import { gql } from '@apollo/client/core';
import { login } from '../authentication/login';
import ApolloClient from '../../lib/ApolloClient';
import { omit } from '../../lib/Helpers';
import { uploadIpfs } from '../../lib/ipfs';
import { LENS_HUB_CONTRACT } from '../../lib/ConfigVars';
import { LENS_HUB_ABI } from '../../lib/ABIs';

const CREATE_COMMENT_TYPED_DATA = `
  mutation($request: CreatePublicCommentRequest!) { 
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        profileIdPointed
        pubIdPointed
        contentURI
        collectModule
        collectModuleData
        referenceModule
        referenceModuleData
      }
     }
   }
 }
`;

const createCommentTypedData = createCommentTypedDataRequest => {
  return ApolloClient.mutate({
    mutation: gql(CREATE_COMMENT_TYPED_DATA),
    variables: {
      request: createCommentTypedDataRequest,
    },
  });
};

export const createComment = async (signer, postMetaData) => {
  if (!postMetaData.profileId) {
    throw new Error('No Profile ID');
  }

  const signedTypeData = async (domain, types, value) => {
    return await signer._signTypedData(
      omit(domain, '__typename'),
      omit(types, '__typename'),
      omit(value, '__typename')
    );
  };

  // TODO: Perform metadata checks.
  // FULL DOCS: https://docs.lens.dev/docs/metadata-standards
  //  postMetaData: {
  //    description?: Markdown
  //    content?: Markdown
  //    external_url: Url
  //    image: Url
  //    imageMimeType: MimeType (e.g. 'image/jpeg')
  //    name: string
  //    media: [ {
  //          item: Url
  //          type: MimeType (e.g. 'image/jpeg')
  //        } ]
  //    appId: 'testing-daoscourse'
  //  }

  const address = await signer.address;
  console.log('create post: address', address);

  await login(address);

  // For more info about the complete IPFS upload object:
  // See lib/ipfs on this repo,
  // See this example: https://github.com/aave/lens-api-examples/blob/master/src/ipfs.ts
  // And see the docs: https://docs.lens.dev/docs/create-post-typed-data
  const ipfsResult = await uploadIpfs(postMetaData);
  console.log('create post: ipfs result', ipfsResult);

  // NOTE: postMetaData.publicationId example: "0xc8-0x07"
  // We must include both the profile id and the post id.

  const createCommentRequest = {
    profileId: postMetaData.profileId,
    publicationId: postMetaData.publicationId,
    contentURI: 'ipfs://' + ipfsResult.path,
    collectModule: {
      // For more info about post modules:
      // https://docs.lens.dev/docs/create-post-typed-data
      //
      // feeCollectModule: {
      //   amount: {
      //     currency: currencies.enabledModuleCurrencies.map(
      //       (c: any) => c.address
      //     )[0],
      //     value: '0.000001',
      //   },
      //   recipient: address,
      //   referralFee: 10.5,
      // },
      //
      // The Revert module works by disallowing all collects.
      // If someone tried to collect from the contract level, it would throw and revert.
      revertCollectModule: true,
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createCommentTypedData(createCommentRequest);
  console.log('create comment: createCommentTypeData', result);

  const typedData = result.data.createCommentTypedData.typedData;
  console.log('create comment: typedData', typedData);

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  console.log('create comment: signature', signature);

  const splitSignature = signature => {
    return utils.splitSignature(signature);
  };

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, await signer);

  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
    collectModule: typedData.value.collectModule,
    collectModuleData: typedData.value.collectModuleData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleData: typedData.value.referenceModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log('create comment: tx hash', tx.hash);
  return tx.hash;
};
