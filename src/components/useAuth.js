class Auth{

    login() {
        sessionStorage.setItem('authenticated', true);
        console.log("Login")
      }
    
      logout() {
        sessionStorage.setItem('authenticated', false);
      }
    
      isAuthenticated() {
        return sessionStorage.getItem('authenticated');
      }
}
   
export default new Auth();
