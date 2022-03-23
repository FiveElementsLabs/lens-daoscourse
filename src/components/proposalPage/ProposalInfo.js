import { Box, Text, useColorModeValue, Link as ReachLink } from '@chakra-ui/react';
import { Mumbai, shortenAddress, useTokenBalance, useTokenList } from '@usedapp/core';
import { DAO_PROFILES } from '../../lib/ConfigVars';

export default function ProposalInfo(proposal) {
  /*  const config = {
    readOnlyChainId: 1,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
  }
 */
  const border = useColorModeValue('gray.200', 'gray.600');
  const accent = useColorModeValue('light_accent', 'dark_accent');

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
      <Text fontSize={20}> Proposal Info</Text>
      <Text>
        Author:&nbsp;
        <ReachLink href={Mumbai.getExplorerAddressLink(proposal.proposal.profile.ownedBy)}>
          {shortenAddress(proposal.proposal.profile.ownedBy)}
        </ReachLink>
      </Text>
      <Text>Created: {createdDate.toLocaleString()}</Text>
      <Text>End: {endDate.toLocaleString()}</Text>
    </Box>
  );
}
