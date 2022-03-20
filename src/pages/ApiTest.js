import { useState } from 'react';
import { Box, Button, Code, Flex, Container } from '@chakra-ui/react';

import { useApi } from '../hooks/useApi';
import { ping } from '../api/health/ping';

export default function ApiTest() {
  const { login, logout } = useApi();
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
            onClick={async () => setMessage(await login())}
            mr={5}
          >
            Login
          </Button>
          <Button onClick={() => setMessage(logout())}>Logout</Button>
        </Flex>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">{JSON.stringify(message)}</Code>
      </Container>
    </>
  );
}
