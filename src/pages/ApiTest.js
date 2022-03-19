import { useState } from 'react';
import { Box, Button, Code, Flex, Container, Text } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

// These are the API routes tested by this component.
import { ping } from '../api/health/ping';
import { login } from '../api/authentication/login';
import { logout } from '../api/authentication/logout';

export default function ApiTest() {
  const { account, library } = useEthers();
  const [message, setMessage] = useState('');

  const onClear = () => {
    setMessage('');
  };

  return (
    <>
      <Box mx="auto" maxW="md" mt={4}>
        <Flex>
          <Button
            w="full"
            onClick={async () => setMessage(await ping())}
            mr={5}
          >
            Ping
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </Flex>
        <Flex mt={4}>
          <Button
            w="full"
            onClick={async () =>
              setMessage(await login(account, library.getSigner()))
            }
            mr={5}
          >
            Login
          </Button>
          <Button onClick={() => setMessage(logout())}>Logout</Button>
        </Flex>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Text mb={5}>
          {!account ? 'Wallet not connected' : `Connected as: ${account}`}
        </Text>
        <Code maxW="container.md">{JSON.stringify(message)}</Code>
      </Container>
    </>
  );
}
