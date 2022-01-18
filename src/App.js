import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer';
import { Routes } from './Routes'
import NavBar from './components/NavBar'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //comment
  useEffect(() => {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}profile`,
            { method: 'POST', headers: { 'Content-Type': 'application/json', "Authorization": Cookies.get("login") } });
        if (response.ok) {
          setIsLoggedIn(true)
        }
  },[])


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
