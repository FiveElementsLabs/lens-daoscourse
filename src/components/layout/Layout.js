import { Box, Container, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />

      <Box textAlign="center" fontSize="xl">
        <Grid minH="90vh" p={3}>
          <Container maxW="container.xl">
            <Outlet />
          </Container>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
