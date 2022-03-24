import { Box, Button, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign='center'>
      <Heading fontSize='3xl' mt={10}>
        Oops, the page you're trying to reach does not exist.
      </Heading>
      <Link to='/'>
        <Button mt={5}>Go Home</Button>
      </Link>
    </Box>
  );
}
