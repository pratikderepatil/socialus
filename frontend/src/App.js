import React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import AllRoutes from './routes/AllRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={2}>
          <Navbar />
          <VStack w="full">
            <AllRoutes />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
