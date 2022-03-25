import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  CircularProgressLabel,
  CircularProgress,
  Button,
  Spacer,
  ButtonGroup,
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
  const [voteYesPerc, setVoteYesPerc] = useState();
  const [voteNoPerc, setVoteNoPerc] = useState();

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
        if (voteAttribute?.traitType === 'VOTE') {
          switch (voteAttribute?.value) {
            case 'YES':
              vote.yes += 1;
              break;
            case 'NO':
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
    setNumberOfVotes(vote.yes + vote.no + vote.abstain);
    setVoteYes(vote.yes);
    setVoteNo(vote.no);
    setVoteAbstain(vote.abstain);
    setVoteYesPerc(Math.trunc((vote.yes / (vote.yes + vote.no + vote.abstain)) * 100) || 0);
    setVoteNoPerc(Math.trunc((vote.no / (vote.yes + vote.no + vote.abstain)) * 100) || 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  const onComment = async vote => {
    const commentMetaData = {
      profileId: currentProfile?.id,
      publicationId: proposal.id,
      name: currentProfile.ownedBy, //Address
      description: `Vote the proposal`, // VOTE == is a vote
      content: proposal.id, //YES - NO
      attributes: [
        {
          value: vote,
          traitType: 'VOTE',
        },
      ],
    };

    await createComment(library.getSigner(), commentMetaData);
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
      </Flex>
      <Box textAlign='center'>
        <Text mt={5}>For</Text>
        <CircularProgress
          value={voteYes}
          max={numberOfVotes}
          color='green.400'
          size='6rem'
          thickness='0.25rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>{voteYesPerc}%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Against</Text>
        <CircularProgress
          value={voteNo}
          max={numberOfVotes}
          color='red.600'
          size='6rem'
          thickness='0.25rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>{voteNoPerc}%</CircularProgressLabel>
        </CircularProgress>
        <Text mt={5}>Abstain</Text>
        <CircularProgress
          value={voteAbstain}
          max={numberOfVotes}
          color='gray.500'
          size='6rem'
          thickness='0.25rem'
          trackColor={useColorModeValue('light_azure', 'dark_azure')}
        >
          <CircularProgressLabel>{voteAbstain > 0 ? 100 - (voteYesPerc + voteNoPerc) : 0}%</CircularProgressLabel>
        </CircularProgress>
      </Box>

      <Text my={3} fontSize='lg' textAlign='center'>
        Cast your Vote
      </Text>

      <Flex w='full' direction='column'>
        <ButtonGroup w='full' display='flex' justifyContent='center' p={1}>
          <Button backgroundColor='green.400' color='black' onClick={() => onComment('YES')} variant='outline' w='full'>
            Yes
          </Button>
          <Button
            backgroundColor='gray.400'
            color='black'
            onClick={() => onComment('ABSTAIN')}
            variant='outline'
            w='full'
          >
            Abstain
          </Button>
          <Button backgroundColor='red.600' color='black' onClick={() => onComment('NO')} variant='outline' w='full'>
            No
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
