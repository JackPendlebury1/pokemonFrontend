class Auth{

    login() {
        localStorage.setItem('authenticated', true);
        console.log("Login")
      }
    
      logout() {
        localStorage.removeItem("login")
        localStorage.setItem('authenticated', false);
      }
    
      isAuthenticated() {
        return localStorage.getItem('authenticated');
      }
}
   
export default new Auth();
