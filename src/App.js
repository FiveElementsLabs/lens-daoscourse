import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { DAppProvider } from '@usedapp/core';
import Client from './lib/ApolloClient';
import Router from './Router';
import DAppConfig from './lib/DAppConfig';

function App() {
  return (
    <DAppProvider config={DAppConfig}>
      <ApolloProvider client={Client}>
        <ChakraProvider theme={theme}>
          <Router />
        </ChakraProvider>
      </ApolloProvider>
    </DAppProvider>
  );
}

export default App;
