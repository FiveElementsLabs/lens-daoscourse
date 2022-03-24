import { useEffect } from 'react';
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
import { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { createComment } from '../../api/publications/comment';

export default function ProposalVote({ proposal, comments }) {
  const { library } = useEthers();
  const { currentProfile } = useProfile();

  const [voteYes, setVoteYes] = useState();
  const [voteNo, setVoteNo] = useState();
  const [voteAbstain, setVoteAbstain] = useState();
  const [numberOfVotes, setNumberOfVotes] = useState();

  const border = useColorModeValue('gray.200', 'transparent');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  useEffect(() => {
    const vote = {
      yes: 0,
      no: 0,
      abstain: 0,
      numberOfVotes: 0,
    };

    if (comments)
      comments.forEach(comment => {
        const voteAttribute = comment.metadata?.attributes[0];
        console.log(comment.metadata.attributes[0]?.value);
        if (voteAttribute?.traitType === 'VOTE') {
          switch (voteAttribute?.value) {
            case 'YES':
              console.log('yes vote');
              vote.yes += 1;
              break;
            case 'NO':
              console.log('no vote');
              vote.no += 1;
              break;
            case 'ABSTAIN':
              vote.abstain += 1;
              break;
            default:
              console.warn('Vote not recognized');
              break;
          }
        }
      });

    setVoteYes(vote.yes);
    setVoteNo(vote.no);
    setVoteAbstain(vote.abstain);
    setNumberOfVotes(vote.yes + vote.no + vote.abstain);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  const onComment = async () => {
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
        <Button background='yellow_accent' _hover={{ bg: 'orange.400' }} onClick={onComment}>
          Vote
        </Button>
      </Flex>
      <Box textAlign='center'>
        <Text mt={5}>For</Text>
        <CircularProgress
          value={voteYes}
          max={numberOfVotes}
          color='green.400'
          size='6rem'
          thickness='0.5rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>{Math.ceil((voteYes / numberOfVotes) * 100)}%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Against</Text>
        <CircularProgress
          value={voteNo}
          max={numberOfVotes}
          color='red.600'
          size='6rem'
          thickness='0.5rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>{Math.ceil((voteNo / numberOfVotes) * 100)}%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Abstain</Text>
        <CircularProgress
          value={voteAbstain}
          max={numberOfVotes}
          color='gray.500'
          size='6rem'
          thickness='0.5rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>{Math.ceil((voteAbstain / numberOfVotes) * 100)}%</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Flex>
        <Button background='yellow_accent' _hover={{ bg: 'orange.400' }} onClick={onComment}>
          Vote
        </Button>
      </Flex>
    </Box>
  );
}
