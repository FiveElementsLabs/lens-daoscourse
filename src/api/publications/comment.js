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

/* referenceModule: {
      followerOnlyReferenceModule: false
    } */

const createCommentTypedData = createCommentTypedDataRequest => {
  return ApolloClient.mutate({
    mutation: gql(CREATE_COMMENT_TYPED_DATA),
    variables: {
      request: createCommentTypedDataRequest,
    },
  });
};

export const createComment = async (signer, commentMetaData) => {
  if (!commentMetaData.profileId) {
    console.error('NO PROFILE ID');
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
  //    attributes: [object]
  //    media: [ {
  //          item: Url
  //          type: MimeType (e.g. 'image/jpeg')
  //        } ]
  //    appId: 'testing-daoscourse'
  //  }

  try {
    const address = await signer.getAddress();
    console.log('create comment: address', address);

    await login(address);

    // For more info about the complete IPFS upload object:
    // See lib/ipfs on this repo,
    // See this example: https://github.com/aave/lens-api-examples/blob/master/src/ipfs.ts
    // And see the docs: https://docs.lens.dev/docs/create-post-typed-data
    const ipfsResult = await uploadIpfs(commentMetaData);
    console.log('create comment: ipfs result', ipfsResult);

    // NOTE: postMetaData.publicationId example: "0xc8-0x07"
    // We must include both the profile id and the post id.

    const createCommentRequest = {
      profileId: commentMetaData.profileId,
      publicationId: commentMetaData.publicationId,
      contentURI: 'ipfs://' + ipfsResult.path,
      collectModule: {
        revertCollectModule: true,
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };

    const result = await createCommentTypedData(createCommentRequest);
    console.log('create comment: createCommentTypedData', result);

    const typedData = result.data.createCommentTypedData.typedData;
    console.log('create comment: typedData', typedData);

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    console.log('create comment: signature', signature);

    const splitSignature = signature => {
      return utils.splitSignature(signature);
    };

    const { v, r, s } = splitSignature(signature);

    const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, await signer);

    const tx = await lensHub.commentWithSig({
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
  } catch (err) {
    console.error('ERROR: ', err?.message);
  }
};
