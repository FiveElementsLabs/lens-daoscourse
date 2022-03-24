import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import { Box, Text, useColorModeValue, CircularProgressLabel, CircularProgress, Button } from '@chakra-ui/react';

import { useProfile } from '../../hooks/useProfile';
import { createComment } from '../../api/publications/comment';

export default function ProposalVote({ proposal }) {
  const { library } = useEthers();

  const { currentProfile } = useProfile();
  console.log(currentProfile);

  const border = useColorModeValue('gray.200', 'gray.700');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  const onComment = async () => {
    // Set Metadata according to our frontend comment policy.#
    // Name: "Comment by {handle}"
    // Description: "Comment by {handle} on proposal {postId}"
    // Content: The actual content of the comment

    const commentMetaData = {
      profileId: currentProfile?.id,
      publicationId: proposal.id,
      name: currentProfile.ownedBy, //Address
      description: `VOTE`, // VOTE == is a vote
      content: 'YES', //YES - NO
    };

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

    const res = await createComment(library.getSigner(), commentMetaData);
    console.log(res);
  };

  return (
    <Box
      mb={3}
      p={3}
      rounded='md'
      textAlign='left'
      shadow='sm'
      border='1px solid'
      borderColor={border}
      backgroundColor={accent}
      fontSize='sm'
    >
      <Text fontSize='xl'>Proposal Vote </Text>
      <Box textAlign='center'>
        <Text mt={5}>For</Text>
        <CircularProgress value={40} color='green.400' size='6rem'>
          <CircularProgressLabel>40%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Against</Text>
        <CircularProgress value={20} color='red.600' size='6rem'>
          <CircularProgressLabel>20%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Abstain</Text>
        <CircularProgress value={40} color='gray.600' size='6rem'>
          <CircularProgressLabel>40%</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box textAlign='center'>
        <Button
          mt={3}
          onClick={() => {
            onComment();
          }}
        >
          Vota
        </Button>
      </Box>
    </Box>
  );
}
