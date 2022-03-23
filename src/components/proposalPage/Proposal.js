import { useState } from 'react';
import { Box, Button, Text, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

export default function Proposal(proposal) {
  const [isExpanded, setIsExpanded] = useState(false);

  const border = useColorModeValue('gray.200', 'gray.600');
  const accent = useColorModeValue('light_accent', 'dark_accent');

  return (
    <>
      <Box
        my={3}
        p={3}
        rounded='md'
        textAlign='left'
        shadow='sm'
        border='1px solid'
        borderColor={border}
        backgroundColor={accent}
      >
        <Text fontWeight={600}>{proposal.proposal.metadata.name}</Text>
        <Text fontSize={14}>{proposal.proposal.metadata.description}</Text>
      </Box>
      <Grid templateColumns={'repeat(12, 1fr)'} gap={4}>
        <GridItem colSpan={{ base: 12, md: 9 }}>
          <Box
            mb={3}
            p={3}
            rounded='md'
            textAlign='center'
            shadow='sm'
            border='1px solid'
            borderColor={border}
            backgroundColor={accent}
          >
            <Text textAlign='left' fontSize='lg'>
              Proposal Content:
            </Text>
            <Text textAlign='left' fontSize='sm' noOfLines={isExpanded ? 1000 : 5}>
              {proposal.proposal.metadata.content}
            </Text>

            <Button size='sm' mt={6} variant='link' fontWeight='bold' onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Show Less...' : 'Show More...'}
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={3} display={{ base: 'none', md: 'block' }}>
          <Box
            mb={3}
            p={3}
            rounded='md'
            textAlign='left'
            shadow='sm'
            border='1px solid'
            borderColor={border}
            backgroundColor={accent}
          >
            Proposal Info
          </Box>
          <Box
            mb={3}
            p={3}
            rounded='md'
            textAlign='left'
            shadow='sm'
            border='1px solid'
            borderColor={border}
            backgroundColor={accent}
          >
            Proposal Vote
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
