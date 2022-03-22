import { Link } from 'react-router-dom';
import { Box, Button, Text, Avatar, useColorModeValue, Flex, Stack } from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlineComment, AiOutlinePlusCircle } from 'react-icons/ai';
import { formatDistanceToNow } from 'date-fns';

export default function Proposal({ dao, proposal }) {
  const { __typename, id, profile, stats, metadata, createdAt } = proposal;
  const { name: author, picture } = profile;
  const { name, description } = metadata;
  const { totalAmountOfMirrors, totalAmountOfCollects, totalAmountOfComments } = stats;

  const border = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
      {__typename === 'Post' && (
        <Link to={`/${dao}/proposal/${id}`}>
          <Box
            mb={3}
            p={3}
            cursor='pointer'
            rounded='md'
            textAlign='left'
            shadow='sm'
            border='1px solid'
            borderColor={border}
          >
            {/* <Flex alignItems="center">
              <Avatar name={author} src={picture?.original?.url} />
              <Badge variant="outline" fontSize="md" ml={2}>
                Proposal {id}
              </Badge>
            </Flex> */}
            <Flex>
              <Avatar name={author} src={picture?.original?.url} mr='14px' />
              <Box>
                <Text fontSize='lg' fontWeight='medium'>
                  {name}
                </Text>
                <Text fontSize='sm'>{description}</Text>
              </Box>
            </Flex>
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
            </Stack>
          </Box>
        </Link>
      )}
    </>
  );
}
