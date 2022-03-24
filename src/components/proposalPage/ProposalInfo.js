import { Box, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { Mumbai, shortenAddress } from '@usedapp/core';

export default function ProposalInfo(proposal) {
  const createdDate = new Date(proposal.proposal.createdAt);
  const endDate = new Date(proposal.proposal.createdAt);
  endDate.setDate(createdDate.getDate() + 7);

  const border = useColorModeValue('gray.200', 'transparent');
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
      fontSize='sm'
      padding={'1rem'}
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
