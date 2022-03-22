import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProposal } from '../api/publications/get-proposal';
import { getComments } from '../api/publications/get-comments';
import { createComment } from '../api/publications/comment';

import {
  Badge,
  Box,
  Heading,
  Button,
  Text,
  Spacer,
  Avatar,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ProposalPage() {
  const { dao, postId } = useParams();
  const [proposal, setProposal] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const comm = await getComments(postId);
        const prop = await getProposal(postId);
        setProposal(prop);
        setComments(comm?.items);
      } catch (err) {
        console.error(err?.message);
      }
    };
    loadData();
  }, [dao, postId]);
  return <>{proposal && typeof comments === 'object' && <Proposal proposal={proposal} comments={comments} />}</>;
}

const Proposal = (proposal, comments) => {
  const border = useColorModeValue('gray.200', 'gray.600');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Box mb={3} p={3} rounded='md' textAlign='left' shadow='sm' border='1px solid' borderColor={border}>
        <Text fontWeight={600}>{proposal.proposal.metadata.name}</Text>
        <Text fontSize={14} opacity={0.5}>
          {proposal.proposal.metadata.description}
        </Text>
      </Box>
      <Grid templateColumns={'repeat(12, 1fr)'} gap={4}>
        <GridItem colSpan={{ base: 12, md: 9 }}>
          <Box mb={3} p={3} rounded='md' textAlign='center' shadow='sm' border='1px solid' borderColor={border}>
            <Text textAlign='left' fontSize={16} opacity={0.5}>
              Proposal Description:
            </Text>
            <Text textAlign='left' fontSize={12} noOfLines={isExpanded ? 1000 : 5}>
              {proposal.proposal.metadata.content}
            </Text>

            <Button size='sm' mt={6} variant='link' fontWeight='bold' onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Show Less...' : 'Show More...'}
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={3} display={{ base: 'none', md: 'block' }}>
          <Box mb={3} p={3} rounded='md' textAlign='left' shadow='sm' border='1px solid' borderColor={border}>
            Proposal Info
          </Box>
          <Box mb={3} p={3} rounded='md' textAlign='left' shadow='sm' border='1px solid' borderColor={border}>
            Proposal Vote
          </Box>
        </GridItem>
      </Grid>

      <Grid templateColumns={'repeat(12, 1fr)'} gap={4}>
        <GridItem colSpan={{ base: 12, md: 9 }}>
          <Box mb={3} p={3} rounded='md' textAlign='left' shadow='sm' border='1px solid' borderColor={border}>
            <Text>Comment section</Text>
            {comments.length &&
              comments.map((comment, idx) => {
                <Comment key={idx} comment={comment} />;
              })}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

const Comment = ({ comment }) => {
  console.log(comment);
  const { metadata } = comment;
  const { content, name, descripton } = metadata;
  return <>{name}</>;
};

/* 
1- Get post with postId and dao name (params)
2- Get comment with postId
3- Create new comment
4- Vote
5- Visualize total vote

Extra: 
  * Open/Close proposal?
*/
