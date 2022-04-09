class Auth{

    login() {
      const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}profile`,
          { method: 'GET', headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("login") } });
        if (response.ok) {
          let data = await response.json();
          setUser(data)
          localStorage.setItem("id", data.id);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("favourites", data.favourites)
        }
      }
      fetchData()   
      }
    
      logout() {
        localStorage.removeItem("login")
        localStorage.removeItem("id", data.id);
        localStorage.setItem("authenticated", false);
      }
    
      isAuthenticated() {
        return localStorage.getItem("authenticated");
      }
}
   
export default new Auth();
