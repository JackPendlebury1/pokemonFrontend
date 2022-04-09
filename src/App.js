import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './Routes'
import NavBar from './components/NavBar'
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <Router>
      <ChakraProvider>
        <NavBar />
        <Routes mt='5' />
      </ChakraProvider>
    </Router>
  );
}

export default App;
