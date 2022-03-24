import { useEthers } from '@usedapp/core';
import {
  Box,
  Text,
  useColorModeValue,
  CircularProgressLabel,
  CircularProgress,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';

import { useProfile } from '../../hooks/useProfile';
import { createComment } from '../../api/publications/comment';

export default function ProposalVote({ proposal, comments }) {
  const { library } = useEthers();

  const { currentProfile } = useProfile();

  const border = useColorModeValue('gray.200', 'transparent');
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
      description: `Vote the proposal`, // VOTE == is a vote
      content: proposal.id, //YES - NO
      attributes: [
        {
          value: 'YES',
          traitType: 'VOTE',
        },
      ],
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
      padding={'1rem'}
    >
      <Flex>
        <Text fontSize='xl'>Proposal Vote </Text>
        <Spacer />
        <Button
          background='yellow_accent'
          _hover={{ bg: 'orange.400' }}
          onClick={() => {
            onComment();
          }}
        >
          Vote
        </Button>
      </Flex>
      <Box textAlign='center'>
        <Text mt={5}>For</Text>
        <CircularProgress
          value={35}
          color='green.400'
          size='6rem'
          thickness='0.5rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>35%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Against</Text>
        <CircularProgress
          value={20}
          color='red.600'
          size='6rem'
          thickness='0.5rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>20%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Abstain</Text>
        <CircularProgress
          value={45}
          color='gray.500'
          size='6rem'
          thickness='0.5rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>45%</CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Box>
  );
}
