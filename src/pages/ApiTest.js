import { useState } from 'react';
import { Box, Button, Code, Flex, Container, Text } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

// These are the API routes tested by this component.
import { ping } from '../api/health/ping';
import { login } from '../api/authentication/login';

export default function ApiTest() {
  const { account, library } = useEthers();
  const [pong, setPong] = useState('');

  const onClear = () => {
    setPong('');
  };

  return (
    <>
      <Box mx="auto" maxW="md" mt={4}>
        <Flex>
          <Button w="full" onClick={async () => setPong(await ping())} mr={5}>
            Ping
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </Flex>
        <Flex mt={4}>
          <Button w="full" onClick={() => login(account, library.getSigner())}>
            Login
          </Button>
        </Flex>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Text>
          {!account ? 'Wallet not connected' : `Connected as: ${account}`}
        </Text>
        <Code>{JSON.stringify(pong)}</Code>
      </Container>
    </>
  );
}
