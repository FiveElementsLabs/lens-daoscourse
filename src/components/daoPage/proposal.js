import { Link } from 'react-router-dom';
import { Box, Button, Text, Avatar, useColorModeValue, Flex, Stack } from '@chakra-ui/react';
import { AiOutlineRetweet, AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

export default function Proposal({ dao, proposal }) {
  const { __typename, id, profile, stats, metadata, createdAt } = proposal;
  const { name: author, picture } = profile;
  const { name, description } = metadata;
  const { totalAmountOfMirrors, totalAmountOfCollects, totalAmountOfComments } = stats;

  const border = useColorModeValue('gray.200', 'transparent');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  return (
    <>
      {__typename === 'Comment' && (
        <Link to={`/${dao}/proposal/${id}`}>
          <Box
            mb={5}
            p={3}
            cursor='pointer'
            rounded='md'
            textAlign='left'
            shadow='md'
            border='1px solid'
            borderColor={border}
            backgroundColor={accent}
            padding={'1.5rem'}
          >
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
              <Button leftIcon={<FaRegComments />} colorScheme='gray' variant='outline' size='xs'>
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
