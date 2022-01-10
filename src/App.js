import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer';
import { Routes } from './Routes'
import NavBar from './components/NavBar'
import { ChakraProvider, Box } from '@chakra-ui/react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <ChakraProvider>
        <NavBar isLoggedIn={isLoggedIn} />
        <Box p={10}>
          <Routes />
        </Box>
      </ChakraProvider>
    </Router>
  );
}

export default App;
