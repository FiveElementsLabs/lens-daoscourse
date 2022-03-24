import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Badge, Box, Heading, Button, Text, Spacer, Avatar, Flex, Grid, GridItem } from '@chakra-ui/react';

import { AiOutlineFileAdd } from 'react-icons/ai';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';

import Proposal from '../components/daoPage/proposal';
import DaoInfo from '../components/daoPage/daoInfo';
import { getPublications } from '../api/publications/get-publications';
import { capitalizeName } from '../lib/Helpers';
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
              <Flex alignItems='center' flexDir={{ base: 'column', md: 'row' }}>
                <Avatar
                  name={proposals[0].profile.name}
                  src={proposals[0].profile.picture?.original?.url}
                  w='100px'
                  h='100px'
                  mr={{ base: 0, md: '14px' }}
                />
                <Box textAlign={{ base: 'center', md: 'left' }}>
                  <Heading>
                    {capitalizeName(daoData.name)}
                    <Badge ml={3} fontSize='xl' variant='outline' rounded='md'>
                      #{proposals[0].profile.id}
                    </Badge>
                  </Heading>
                  <Text>{daoData.desc}</Text>
                </Box>

                <Spacer />
                <Box mt={{ base: 3, md: 0 }}>
                  <Button variant='ghost' leftIcon={<RiUserUnfollowLine />}>
                    Follow
                  </Button>
                </Box>
                <Spacer />
                <Box mt={{ base: 3, md: 0 }}>
                  <Button leftIcon={<AiOutlineFileAdd />}>Create Proposal</Button>
                </Box>
              </Flex>
            </Box>
          )}

          <Grid templateColumns={'repeat(12, 1fr)'} gap={5} mt={5}>
            <GridItem colSpan={{ base: 12, md: 9 }}>
              {proposals && proposals.map((proposal, idx) => <Proposal key={idx} dao={dao} proposal={proposal} />)}
            </GridItem>
            <GridItem colSpan={3} display={{ base: 'none', md: 'block' }}>
              {proposals.length && <DaoInfo proposal={proposals[0]} />}
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
}
