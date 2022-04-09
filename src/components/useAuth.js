import React from 'react';
class Auth extends React.Component{
    
    login(cb) {
      const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}profile`,
          { method: 'GET', headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("login") } });
        if (response.ok) {
          let data = await response.json();
          localStorage.setItem("id", data.id);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("user", data)
          localStorage.setItem("favourites", data.favourites)
        }
      }
      fetchData();
      cb();
      this.window.location.reload();
      }
    
      logout(cb) {
        localStorage.removeItem("login")
        localStorage.removeItem("id");
        localStorage.removeItem("user");
        localStorage.removeItem("favourites");
        localStorage.setItem("authenticated", false);
        cb()
      }
    
      isAuthenticated() {
        return localStorage.getItem("authenticated");
      }
}
   
export default new Auth();
