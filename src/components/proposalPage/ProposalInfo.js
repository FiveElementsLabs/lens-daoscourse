import { Box, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { Mumbai, shortenAddress, useTokenBalance, useTokenList } from '@usedapp/core';
import { DAO_PROFILES } from '../../lib/ConfigVars';

export default function ProposalInfo(proposal) {
  const createdDate = new Date(proposal.proposal.createdAt);
  const endDate = new Date(proposal.proposal.createdAt);
  endDate.setDate(createdDate.getDate() + 7);

  const daoInfo = DAO_PROFILES.find(d => d.name === proposal.proposal.name);
  console.log(daoInfo);
  const uniBalance = useTokenBalance(
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0x2B1Ad6184a6B0fac06bD225ed37C2AbC04415fF4'
  );
  const tokenBalance = useTokenList();

  console.log('balance: ', uniBalance);
  console.log('Token balance: ', tokenBalance);
  //console.log(useToken(daoInfo.daoToken));

  const border = useColorModeValue('gray.200', 'gray.700');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  return (
    <Box
      mb={3}
      p={3}
      rounded='md'
      textAlign='left'
      shadow='sm'
      border='1px solid'
      borderColor={border}
      backgroundColor={accent}
      fontSize={14}
    >
      <Text fontSize='xl'> Proposal Overview</Text>
      <Text>Unique ID: {proposal.proposal.id}</Text>
      <Text>
        Author:{' '}
        <Link href={Mumbai.getExplorerAddressLink(proposal.proposal.profile.ownedBy)}>
          {shortenAddress(proposal.proposal.profile.ownedBy)}
        </Link>
      </Text>
      <Text>Created: {createdDate.toLocaleString()}</Text>
      <Text>End: {endDate.toLocaleString()}</Text>
    </Box>
  );
}
