import { Link } from 'react-router-dom';
import {
  Badge,
  Box,
  Heading,
  Button,
  Text,
  Avatar,
  useColorModeValue,
  Flex,
  Stack,
  Link as ReachLink,
} from '@chakra-ui/react';
import {
  AiOutlineRetweet,
  AiOutlineComment,
  AiOutlinePlusCircle,
} from 'react-icons/ai';

import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatRelative,
  subDays,
} from 'date-fns';

export default function DaoInfo({ dao, proposal }) {
  const { __typename, id, profile, metadata, createdAt } = proposal;
  const {
    name: author,
    picture,
    website,
    twitterUrl,
    location,
    bio,
    stats,
  } = profile;
  const {
    totalFollowing,
    totalPosts,
    totalComments,
    totalMirrors,
    totalCollects,
  } = stats;

  const border = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
      <Box mb={3}>
        <Box
          textAlign="left"
          border="1px solid"
          borderColor={border}
          p={3}
          rounded="md"
        >
          <Text>{author}</Text>
          <Text mt={5}>Bio</Text>
          <Text fontSize={16} opacity={0.5}>
            {bio}
          </Text>

          <Text mt={5}>Stats</Text>
          <Text fontSize={16} opacity={0.5}>
            Following: {totalFollowing}
          </Text>
          <Text fontSize={16} opacity={0.5}>
            Posts: {totalPosts}
          </Text>
          <Text fontSize={16} opacity={0.5}>
            Comments: {totalComments}
          </Text>
          <Text fontSize={16} opacity={0.5}>
            Mirrors: {totalMirrors}
          </Text>
          <Text fontSize={16} opacity={0.5}>
            Collects: {totalCollects}
          </Text>

          <Text mt={5}>Socials</Text>
          <Text mt={5}>
            <ReachLink href={website}>
              <Flex alignItems="center">
                <Avatar name={author} src={picture} mr="14px" />
                <Text fontSize={14} opacity={0.5} pb="2px">
                  {website}
                </Text>
              </Flex>
            </ReachLink>
          </Text>
          <Text mt={5}>
            <ReachLink href={twitterUrl}>
              <Flex alignItems="center">
                <Avatar
                  name={author}
                  src="https://w7.pngwing.com/pngs/566/680/png-transparent-logo-twitter-social-media-networking-community-internet-social-icon-website-network.png"
                  mr="14px"
                />
                <Text fontSize={14} opacity={0.5} pb="2px">
                  @{author}
                </Text>
              </Flex>
            </ReachLink>
          </Text>
        </Box>
      </Box>
    </>
  );
}
