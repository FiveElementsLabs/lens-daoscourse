import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import NavBar from './components/navbar/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar/>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
