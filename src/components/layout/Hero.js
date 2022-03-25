import { Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';

export default function Hero(props) {
  return (
    <Container maxW={'5xl'}>
      <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
        <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
          Choose wisely,{' '}
          <Text as={'span'} color={'orange.400'}>
            choose DAOscourse.
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'2xl'}>
          Keep yourself up-to-date about DAO proposals, governance, and more.<br></br> All in one place.
        </Text>
        <Flex justifyContent='center' alignItems='center' bgColor={'transparent'}>
          <Button
            {...props}
            px={8}
            bg={'orange.400'}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            How it works
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}
