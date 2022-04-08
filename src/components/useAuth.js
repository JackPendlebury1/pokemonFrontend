class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login() {
      this.authenticated = true;
      console.log("Login")
    }
  
    logout() {
      this.authenticated = false;
      console.log("Logout")
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
export default new Auth();