import { Box, useColorModeValue, Flex, Text, Link } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { RiTwitterLine } from 'react-icons/ri';

export default function DaoInfo({ proposal }) {
  const { profile } = proposal;
  const { name: author, website, twitterUrl, bio, stats } = profile;
  const { totalFollowing, totalPosts, totalComments, totalMirrors, totalCollects } = stats;

  const border = useColorModeValue('gray.200', 'transparent');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  return (
    <>
      <Box mb={3}>
        <Box
          textAlign='left'
          border='1px solid'
          borderColor={border}
          backgroundColor={accent}
          p={3}
          rounded='md'
          shadow='md'
          padding={'1.5rem'}
        >
          <Text fontSize='2xl' fontWeight='medium'>
            {author}
          </Text>
          <Text fontSize='xl' mt={3}>
            Overview
          </Text>
          <Text fontSize='md' opacity={0.6}>
            {bio}
          </Text>

          <Text fontSize='xl' mt={4}>
            Statistics
          </Text>
          <Text fontSize='md' opacity={0.6}>
            Following: {totalFollowing}
          </Text>
          <Text fontSize='md' opacity={0.6}>
            Posts: {totalPosts}
          </Text>
          <Text fontSize={16} opacity={0.6}>
            Comments: {totalComments}
          </Text>
          <Text fontSize={16} opacity={0.6}>
            Mirrors: {totalMirrors}
          </Text>
          <Text fontSize={16} opacity={0.6}>
            Collects: {totalCollects}
          </Text>

          <Text fontSize='xl' mt={4}>
            Social
          </Text>

          <Box mt={1}>
            <Link href={website} target='_blank' rel='noopener noreferrer'>
              <Flex alignItems='center'>
                <FiExternalLink size={24} opacity={0.85} style={{ marginRight: 10 }} />
                <Text fontSize='sm' opacity={0.6} pb='1px'>
                  {website}
                </Text>
              </Flex>
            </Link>
          </Box>

          <Box mt={2}>
            <Link href={twitterUrl} target='_blank' rel='noopener noreferrer'>
              <Flex alignItems='center'>
                <RiTwitterLine size={24} opacity={0.85} style={{ marginRight: 10 }} />
                <Text fontSize={14} opacity={0.6} pb='3px'>
                  @{author}
                </Text>
              </Flex>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
