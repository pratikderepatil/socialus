import React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import AllRoutes from './routes/AllRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Navbar />
          <VStack spacing={8}>
            <AllRoutes />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
