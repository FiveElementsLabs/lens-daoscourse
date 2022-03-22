import { Box, Container, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { useEthersNotifications } from '../../hooks/useEthersNotifications';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

export default function Layout() {
  // Show notifications for transaction states and wallet connection.
  useEthersNotifications();

  return (
    <>
      <Navbar />

      <Box textAlign="center" fontSize="xl">
        <Grid minH="90vh">
          <Container maxW="container.xl">
            <Outlet />
          </Container>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
