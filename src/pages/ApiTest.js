import { useState } from 'react';
import { Box, Button, Code, Flex, Container } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { ping } from '../api/health/ping';
import { getPublications } from '../api/publications/get-publications';

export default function ApiTest() {
  const { login, logout } = useAuth();
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
        <Button
          w="full"
          mt={5}
          onClick={async () => setMessage(await getPublications())}
        >
          Get publications by 0x13
        </Button>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">{JSON.stringify(message)}</Code>
      </Container>
    </>
  );
}
