import bootbox from 'bootbox';
import angular from 'angular';
import accountService from './../services/api.service';

export default class AccountController {
  constructor(api, notifications) {  
    this.api = api;
    this.notify = notifications;
    this.account = null;
    this.resetPassword = false;
    this.password = null;
    this.passwordConfirmation = null;
  }
  
  init() {
    this.account = JSON.parse(localStorage['userInfo']);
  }
  
  save() {
      
  }
 
}

AccountController.$inject = ['api','notifications'];
