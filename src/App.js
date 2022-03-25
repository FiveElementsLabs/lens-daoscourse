import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { DAppProvider } from '@usedapp/core';

import Client from './lib/ApolloClient';
import DAppConfig from './lib/DAppConfig';
import Theme from './lib/Theme';
import Router from './Router';

function App() {
  return (
    <DAppProvider config={DAppConfig}>
      <ApolloProvider client={Client}>
        <ChakraProvider theme={Theme}>
          <Router />
        </ChakraProvider>
      </ApolloProvider>
    </DAppProvider>
  );
}

export default App;
