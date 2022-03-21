import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Badge,
  Box,
  Heading,
  Button,
  Select,
  Text,
  Avatar,
  useColorModeValue,
  Flex,
  Stack,
} from '@chakra-ui/react';
import {
  AiOutlineRetweet,
  AiOutlineComment,
  AiOutlinePlusCircle,
} from 'react-icons/ai';

import { getPublications } from '../api/publications/get-publications';
import { DAO_PROFILES } from '../lib/ConfigVars';

// 1. Control if the :dao name exists in the dao array.
// 2. Query proposals for the dao (get posts)
// 3. show a list of proposals (feed)

export default function DaoPage() {
  const { dao } = useParams();
  const [proposals, setProposals] = useState([]);
  const [daoData, setDaoData] = useState(null);

  useEffect(() => {
    const loadDaoData = async () => {
      if (dao) {
        try {
          const daoInfo = DAO_PROFILES.find(d => d.name === dao);
          const res = await getPublications(daoInfo.profileId);
          setDaoData(daoInfo);
          setProposals(res);
        } catch (err) {
          console.error(err?.message);
        }
      }
    };
    loadDaoData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dao]);

  return (
    <>
      {daoData && (
        <>
          <Box mt={5}>
            <Heading>{daoData.name}</Heading>
            <Text mt={1}>{daoData.desc}</Text>
          </Box>
          <Box py={5}>
            <Select placeholder="Most Recent">
              <option value="option1">Most Recent</option>
              <option value="option2">Most Popular</option>
              <option value="option3">Most Commented</option>
            </Select>
          </Box>

          {proposals &&
            proposals.map((proposal, idx) => (
              <Proposal key={idx} dao={dao} proposal={proposal} />
            ))}
        </>
      )}
    </>
  );
}

function Proposal({ dao, proposal }) {
  const { __typename, id, profile, stats, metadata, createdAt } = proposal;
  const { name: author, picture } = profile;
  const { name, description, content } = metadata;
  const { totalAmountOfMirrors, totalAmountOfCollects, totalAmountOfComments } =
    stats;

  const border = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
      {__typename === 'Post' && (
        <Link to={`/${dao}/proposal/${id}`}>
          <Box
            mb={3}
            p={3}
            cursor="pointer"
            rounded="md"
            textAlign="left"
            shadow="sm"
            border="1px solid"
            borderColor={border}
          >
            <Flex alignItems="center">
              <Avatar name={author} src={picture?.original?.url} />
              <Badge variant="outline" fontSize="md" ml={2}>
                Proposal {id}
              </Badge>
            </Flex>
            <Text fontSize={{ base: 'lg', md: 'lg' }} fontWeight="medium">
              {name}
            </Text>
            <Text fontSize="md">{description}</Text>
            <Stack id="stats" mt={2} direction="row">
              <Button
                leftIcon={<AiOutlineRetweet />}
                colorScheme="gray"
                variant="outline"
              >
                {totalAmountOfMirrors}
              </Button>
              <Button
                leftIcon={<AiOutlinePlusCircle />}
                colorScheme="gray"
                variant="outline"
              >
                {totalAmountOfCollects}
              </Button>
              <Button
                leftIcon={<AiOutlineComment />}
                colorScheme="gray"
                variant="outline"
              >
                {totalAmountOfComments}
              </Button>
            </Stack>
          </Box>
        </Link>
      )}
    </>
  );
}
