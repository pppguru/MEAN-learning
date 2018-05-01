import angular from 'angular';

class Auth {
    constructor() {
        
    }
    
    loggedIn() {
        let userToken = 'userToken';
        
        if (!localStorage.getItem(userToken))
            return false;
            
        let token = localStorage.getItem(userToken);
        //check something on the token?
        return true;
    }
}

export default angular.module('services.auth', [])
  .service('auth', Auth)
  .name;