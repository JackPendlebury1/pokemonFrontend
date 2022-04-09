import React from 'react';
import { useHistory } from "react-router-dom";
class Auth extends React.Component{
    
    login() {
      let history = useHistory();
      const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}profile`,
          { method: 'GET', headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("login") } });
        if (response.ok) {
          let data = await response.json();
          localStorage.setItem("id", data.id);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("user", data)
          history.push("/dashboard/pokedex");
          window.location.reload();
        }
      }
      fetchData()   
      }
    
      logout() {
        localStorage.removeItem("login")
        localStorage.removeItem("id");
        localStorage.removeItem("user");
        localStorage.setItem("authenticated", false);
      }
    
      isAuthenticated() {
        return localStorage.getItem("authenticated");
      }
}
   
export default new Auth();
