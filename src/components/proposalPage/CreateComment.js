import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import { Box, FormControl, Textarea, Button, Spacer, useColorModeValue, Flex, Text } from '@chakra-ui/react';

import { createComment } from '../../api/publications/comment';
import { useProfile } from '../../hooks/useProfile';

export default function CreateComment({ postId }) {
  const { library } = useEthers();
  const [comment, setComment] = useState();
  const { currentProfile } = useProfile();

  const onComment = async e => {
    e.preventDefault();
    // Set Metadata according to our frontend comment policy.#
    // Name: "Comment by {handle}"
    // Description: "Comment by {handle} on proposal {postId}"
    // Content: The actual content of the comment
    // Attributes: empty array

    const commentMetaData = {
      profileId: currentProfile?.id,
      publicationId: postId,
      name: `Comment by @${currentProfile?.handle}`,
      description: `This is a comment by @${currentProfile?.handle} on proposal #${postId}`,
      attributes: [],
      content: comment,
    };
    console.log('COMMENT METADATA: ', commentMetaData);

    //  postMetaData: {
    //    profileId: hexId: the ID of who is pubilishing the post (must be logged-in).
    //    publicationId: hexId-hexId: The ID of the publication to point comment on.
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

    await createComment(library.getSigner(), commentMetaData);
  };

  const border = useColorModeValue('gray.300', 'gray.700');

  return (
    <Box w='full' mt={3} p={3} border='1px solid' rounded='md' borderColor={border}>
      <form onSubmit={onComment} style={{ textAlign: 'right' }}>
        <FormControl isRequired borderBottom='1px solid' borderColor={border}>
          <Textarea
            placeholder='Write your comment here'
            border='0'
            resize='none'
            onChange={e => setComment(e.target.value)}
          />
        </FormControl>
        <Flex alignItems='center' pt={3}>
          <Text fontSize='md' fontWeight='medium' width='fit-content' my='auto'>
            Publish as: @{currentProfile?.handle}
          </Text>
          <Spacer />
          <Button type='submit'>Publish Comment</Button>
        </Flex>
      </form>
    </Box>
  );
}
