import { useState } from 'react';
import { Box, Button, Code, Flex, Container } from '@chakra-ui/react';

import { ping } from '../api/health/ping';
import { login } from '../api/authentication/login';

export default function ApiTest() {
  const [pong, setPong] = useState('');

  const onClear = () => {
    setPong('');
  };

  console.log(pong);
  return (
    <>
      <Box>
        <Flex>
          <Button onClick={async () => setPong(await ping())} mr={5}>
            Ping
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </Flex>
        <Flex mt={5}>
          <Button onClick={() => login()}>Login</Button>
        </Flex>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Code>{JSON.stringify(pong)}</Code>
      </Container>
    </>
  );
}
