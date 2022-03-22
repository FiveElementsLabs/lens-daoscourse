import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Heading,
  Button,
  Text,
  Spacer,
  Avatar,
  useColorModeValue,
  Flex,
  Stack,
  Grid,
  GridItem,
} from '@chakra-ui/react';

import { AiOutlineFileAdd } from 'react-icons/ai';

import Proposal from '../components/daoPage/proposal';
import DaoInfo from '../components/daoPage/daoInfo';
import { getPublications } from '../api/publications/get-publications';
import { DAO_PROFILES } from '../lib/ConfigVars';

// 1. Control if the :dao name exists in the dao array.
// 2. Query proposals for the dao (get posts)
// 3. show a list of proposals (feed)

export default function DaoPage() {
  const { dao } = useParams();
  let navigate = useNavigate();
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
          navigate('/');
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
          {proposals.length && (
            <Box mt={5}>
              <Flex alignItems="center">
                <Avatar
                  name={proposals[0].profile.name}
                  src={proposals[0].profile.picture?.original?.url}
                  w="100px"
                  h="100px"
                  mr="14px"
                />
                <Heading m={0}>
                  {proposals[0].profile.name} / {daoData.name}
                </Heading>
                <Badge variant="outline" fontSize="xl" ml={2}>
                  #{proposals[0].profile.id}
                </Badge>
                <Spacer />
                <Link to="/create-post">
                  <Button mr={0} leftIcon={<AiOutlineFileAdd />}>
                    Create Proposal
                  </Button>
                </Link>
              </Flex>
              <Flex>
                <Text ml="114px">{daoData.desc}</Text>
              </Flex>
            </Box>
          )}
          <Box py={5}>
            {/* <Select placeholder="Most Recent">  
              <option value="option1">Most Recent</option>
              <option value="option2">Most Popular</option>
              <option value="option3">Most Commented</option>
            </Select> */}
          </Box>

          <Grid templateColumns={'repeat(12, 1fr)'} gap={4}>
            <GridItem colSpan={{base: 12, md: 9}}>
              {proposals &&
                proposals.map((proposal, idx) => (
                  <Proposal key={idx} dao={dao} proposal={proposal} />
                ))}
            </GridItem>
            <GridItem colSpan={3} display={{base: "none", md: "block"}}>
              {proposals.length && (
                <DaoInfo dao={dao} proposal={proposals[0]} />
              )}
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
}
