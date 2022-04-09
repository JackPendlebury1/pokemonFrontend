import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './Routes'
import NavBar from './components/NavBar'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState([])

  useEffect(() => {
    
  }, [])


  return (
    <Router>
      <ChakraProvider>
        <NavBar isLoggedIn={isLoggedIn} user={user} />
        <Routes mt='5' user={user} />
      </ChakraProvider>
    </Router>
  );
}

export default App;
