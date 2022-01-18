import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './Routes'
import {NavBar} from './components/NavBar'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userImage, setUserImage] = useState("")
 
  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}profile`,
            { method: 'GET', headers: { 'Content-Type': 'application/json', "Authorization": Cookies.get("login") } });
        if (response.ok) {
          let data = response.json
          console.log(data.userImage)
          setUserImage(data.userImage)
          setIsLoggedIn(true)
        }
      }
      fetchData()
  },[])


  return (
    <Router>
      <ChakraProvider>
        <NavBar isLoggedIn={isLoggedIn} userImage={userImage}/>
        <Box p={10}>
          <Routes userImage={userImage}/>
        </Box>
      </ChakraProvider>
    </Router>
  );
}

export default App;
