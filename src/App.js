import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './Routes'
import {NavBar} from './components/NavBar'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState([])
 
  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}profile`,
            { method: 'GET', headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("login") } });
        if (response.ok) {
          let data = await response.json();
          setUser(data)
          setIsLoggedIn(true)
        }
      }
      fetchData()
  },[])


  return (
    <Router>
      <ChakraProvider>
          <NavBar isLoggedIn={isLoggedIn} user={user}/>
            <Routes mt='5' user={user}/>
      </ChakraProvider>
    </Router>
  );
}

export default App;
