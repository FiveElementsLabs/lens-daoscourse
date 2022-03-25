import { Container, Heading, Stack, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { HashLink as Link } from 'react-router-hash-link';

export default function Hero() {
  return (
    <Container maxW={'5xl'}>
      <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 10 }} pt={{ base: 20, md: 28 }}>
        <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
          DAO Governance
          <Text color={useColorModeValue('primary', 'yellow_accent')}>On-Chain</Text>
        </Heading>
        <Text color={'gray.500'} maxW={'2xl'} fontSize={'2xl'}>
          Stay up-to-date about DAO proposals, governance, and more.<br></br> All in one place.
        </Text>
        <Stack direction={'row'}>
          <Button rounded={'full'} px={6} colorScheme={'orange'} bg={'orange.400'} _hover={{ bg: 'orange.500' }}>
            <Link to='#daos' rel='noopener noreferrer'>
              DAOs
            </Link>
          </Button>
          <Button rounded={'full'} px={6}>
            <Link to='#how-it-works' rel='noopener noreferrer'>
              Learn more
            </Link>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
