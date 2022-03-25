import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Badge, Box, Heading, Button, Text, Spacer, Avatar, Flex, Grid, GridItem } from '@chakra-ui/react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { RiUserFollowLine } from 'react-icons/ri';
import { useEthers } from '@usedapp/core';

import Proposal from '../components/daoPage/proposal';
import DaoInfo from '../components/daoPage/daoInfo';
import { getComments } from '../api/publications/get-comments';
import { createFollow } from '../api/publications/follow';
import { capitalizeName } from '../lib/Helpers';
import { DAO_PROFILES } from '../lib/ConfigVars';

// 1. Control if the :dao name exists in the dao array.
// 2. Query proposals for the dao (get posts)
// 3. show a list of proposals (feed)

export default function DaoPage() {
  const { dao } = useParams();
  let navigate = useNavigate();
  const { library } = useEthers();

  const [proposals, setProposals] = useState([]);
  const [daoData, setDaoData] = useState(null);

  useEffect(() => {
    const loadDaoData = async () => {
      if (dao) {
        try {
          const daoInfo = DAO_PROFILES.find(d => d.name === dao);
          const res = await getComments(daoInfo.homepage);
          //const res = await getPublications(daoInfo.profileId);
          setDaoData(daoInfo);
          setProposals(res.items);
        } catch (err) {
          navigate('/error/not-found');
        }
      }
    };
    loadDaoData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dao]);

  const onFollow = async () => {
    // Set Metadata according to our frontend comment policy.#
    // Name: "Comment by {handle}"
    // Description: "Comment by {handle} on proposal {postId}"
    // Content: The actual content of the comment

    const followMetaData = {
      profileId: daoData?.profileId,
    };

    await createFollow(library.getSigner(), followMetaData);
  };

  return (
    <>
      {daoData && (
        <>
          {proposals.length && (
            <Box mt={5}>
              <Flex alignItems='center' flexDir={{ base: 'column', md: 'row' }}>
                <Avatar
                  name={proposals[0].mainPost?.profile.name}
                  src={daoData.img}
                  backgroundColor='white'
                  w='100px'
                  h='100px'
                  mr={{ base: 0, md: '14px' }}
                />
                <Box textAlign={{ base: 'center', md: 'left' }}>
                  <Heading>
                    {capitalizeName(daoData.name)}
                    <Badge ml={3} fontSize='xl' variant='outline' rounded='md'>
                      #{proposals[0].mainPost?.profile.id}
                    </Badge>
                  </Heading>
                  <Text>{daoData.desc}</Text>
                </Box>

                <Spacer />
                <Box mt={{ base: 3, md: 0 }} mr={2}>
                  <Button variant='solid' leftIcon={<RiUserFollowLine />} onClick={onFollow}>
                    Follow DAO
                  </Button>
                </Box>
                <Link to={`/${daoData.homepage}/create-post`}>
                  <Box mt={{ base: 3, md: 0 }}>
                    <Button leftIcon={<AiOutlineFileAdd />}>Create Proposal</Button>
                  </Box>
                </Link>
              </Flex>
            </Box>
          )}

          <Grid templateColumns={'repeat(12, 1fr)'} gap={5} mt={5}>
            <GridItem colSpan={{ base: 12, md: 9 }}>
              {proposals &&
                proposals.map((proposal, idx) => {
                  return <Proposal key={idx} dao={dao} proposal={proposal} />;
                })}
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
