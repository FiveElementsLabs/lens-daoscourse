import { useState } from 'react';
import { Box, Button, Code, Flex, Container } from '@chakra-ui/react';

import { ping } from '../api/health/ping';

export default function ApiTest() {
  const [pong, setPong] = useState('');

  const onPing = async () => {
    setPong(await ping());
  };

  const onClear = () => {
    setPong('');
  };

  console.log(pong);
  return (
    <>
      <Box>
        <Flex>
          <Button onClick={onPing} mr={5}>
            Ping
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </Flex>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Code>{JSON.stringify(pong)}</Code>
      </Container>
    </>
  );
}
