import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridItem, Box, Text, useColorModeValue } from '@chakra-ui/react';

import Proposal from '../components/proposalPage/Proposal';
import Comment from '../components/proposalPage/Comment';
import { getProposal } from '../api/publications/get-proposal';
import { getComments } from '../api/publications/get-comments';
// import { createComment } from '../api/publications/comment';

/*
 * 1- Get post with postId and dao name (params)
 * 2- Get comment with postId
 * 3- Create new comment
 * 4- Vote
 * 5- Visualize total vote
 *
 * Extra:
 *  - Open/Close proposal?
 */

export default function ProposalPage() {
  const { dao, postId } = useParams();
  const [proposal, setProposal] = useState();
  const [comments, setComments] = useState([]);

  const border = useColorModeValue('gray.200', 'gray.600');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  useEffect(() => {
    const loadData = async () => {
      if (postId)
        try {
          const prop = await getProposal(postId);
          const comm = await getComments(postId);
          setProposal(prop);
          setComments(comm.items);
        } catch (err) {
          console.error('LOADING ERROR: ', err?.message);
        }
    };
    loadData();
  }, [dao, postId, comments, proposal]);

  return (
    <>
      {proposal && typeof comments === 'object' && (
        <>
          <Proposal proposal={proposal} />

          <Grid templateColumns={'repeat(12, 1fr)'} gap={4}>
            <GridItem colSpan={{ base: 12, md: 9 }}>
              <Box
                mb={3}
                p={3}
                rounded='md'
                textAlign='left'
                shadow='sm'
                border='1px solid'
                borderColor={border}
                backgroundColor={accent}
              >
                <Text>Comment section</Text>
                {comments && comments.map((comment, idx) => <Comment key={idx} comment={comment} />)}
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
}
