import { Box, Text, useColorModeValue, Link as ReachLink } from '@chakra-ui/react';
import { Mumbai, shortenAddress } from '@usedapp/core';

export default function ProposalInfo(proposal) {
  const border = useColorModeValue('gray.200', 'gray.600');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  const createdDate = new Date(proposal.proposal.createdAt);
  const endDate = new Date(proposal.proposal.createdAt);
  endDate.setDate(createdDate.getDate() + 7);

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
