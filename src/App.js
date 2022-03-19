import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import Client from './lib/ApolloClient';
import Router from './Router';

function App() {
  return (
    <ApolloProvider client={Client}>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
