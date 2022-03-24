import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { useEthersNotifications } from '../../hooks/useEthersNotifications';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

export default function Layout() {
  // Show notifications for transaction states and wallet connection.
  useEthersNotifications();

  return (
    <Box position='relative' w='full' minH='100vh'>
      <Navbar />

      <Container maxW='container.xl' pb={{ base: 48, md: 28 }}>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}
