import angular from 'angular';
import jwtDecode from 'jwt-decode';

export default class IndexController {
  constructor($location) {  
    this.location = $location;
  }

  init() {
      
  }
  
  loggedIn() {
    return localStorage['userToken'] != null;
  }
  
  logout() {
    localStorage.removeItem('userToken');
    this.location.path('/login');
  }
  
  userMessage() {
    if (this.loggedIn()) {
      let tokenObject = JSON.parse(localStorage['userToken']);
      let userInfo = jwtDecode(tokenObject.token);
      return 'Welcome, ' + userInfo.firstName + ' ' + userInfo.lastName;
    }
  }
}

IndexController.$inject = ['$location'];