import { useState, useEffect } from 'react';
import { Box, Flex, Avatar, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

import { getComments } from '../../api/publications/get-comments';
import CreateComment from '../../components/proposalPage/CreateComment';

export default function Comment({ comment }) {
  const [replies, setReplies] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const { metadata, profile, stats, createdAt, id } = comment;
  const { name: author, picture } = profile;
  const { name, content } = metadata;
  const { totalAmountOfCollects, totalAmountOfComments, totalAmountOfMirrors } = stats;

  useEffect(() => {
    const loadReplies = async () => {
      if (totalAmountOfComments > 0) {
        const { items } = await getComments(id);
        setReplies(items);
      }
    };
    loadReplies();
  }, [id, totalAmountOfComments]);

  const border = useColorModeValue('gray.300', 'gray.700');

  // Handling comments on our frontend:
  // Name: "Comment by {userhandle}",
  // Description: "Comment by {handle} on proposal {postId}"
  // Content: The actual content of the comment

  return (
    <>
      <Box borderBottom='1px solid' borderColor={border} p={5}>
        <Flex mb={3}>
          <Avatar name={author} src={picture?.original?.url} w='30px' h='30px' mr='14px' />
          <Text>{name}</Text>
        </Flex>
        <Text opacity={0.8} mb={4}>
          {content}
        </Text>

        <Stack id='stats' mt={2} direction='row' alignItems='center'>
          <Button leftIcon={<AiOutlineRetweet />} colorScheme='gray' variant='outline' size='xs'>
            {totalAmountOfMirrors}
          </Button>
          <Button leftIcon={<AiOutlinePlusCircle />} colorScheme='gray' variant='outline' size='xs'>
            {totalAmountOfCollects}
          </Button>
          <Button leftIcon={<FaRegComments />} colorScheme='gray' variant='outline' size='xs'>
            {totalAmountOfComments}
          </Button>
          <Text fontSize={12}>
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </Text>
          <Button variant='link' onClick={() => setShowReply(!showReply)} fontSize={12}>
            Reply
          </Button>
        </Stack>
        <Box display={showReply ? 'block' : 'none'}>
          <CreateComment postId={comment.id} />
        </Box>
        {replies && replies.map((reply, idx) => <Comment key={idx} comment={reply} />)}
      </Box>
    </>
  );
}
