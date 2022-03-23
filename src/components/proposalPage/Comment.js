import { Box, Flex, Avatar, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlineComment, AiOutlinePlusCircle } from 'react-icons/ai';
import { formatDistanceToNow } from 'date-fns';

export default function Comment({ comment }) {
  const { metadata, profile, stats, createdAt } = comment;
  const { name: author, picture } = profile;
  const { name, content } = metadata;
  const { totalAmountOfCollects, totalAmountOfComments, totalAmountOfMirrors } = stats;

  const border = useColorModeValue('gray.300', 'gray.700');

  // Handling comments on our frontend:
  // Name: "Comment by {userhandle}",
  // Description == Content, and show only content.

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
          <Button leftIcon={<AiOutlineComment />} colorScheme='gray' variant='outline' size='xs'>
            {totalAmountOfComments}
          </Button>
          <Text fontSize={12}>
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </Text>
          <Text fontSize={12}>Reply</Text>
        </Stack>
      </Box>
    </>
  );
}
