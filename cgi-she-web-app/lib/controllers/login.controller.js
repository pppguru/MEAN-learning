import bootbox from 'bootbox';
import angular from 'angular';
import jwtDecode from 'jwt-decode';

export default class LoginController {
  constructor(api, notifications, $location, $auth) {
    this.api = api;
    this.notify = notifications;
    this.authSubmitted = false;
    this.location = $location;
    this.auth = $auth;

    this.username = null;
    this.password = null;
  }

  init() {
  }

  facebook() {
    let instance = this;
    instance.authSubmitted = true;

    this.auth.authenticate('facebook').then((response) => {
      if (response.data) {
        setLocalStorage(instance, response.data);
      }

      instance.authSubmitted = false;
    }, (error) => {
      instance.authSubmitted = false;
    });
  }

  google() {
    let instance = this;
    instance.authSubmitted = true;

    this.auth.authenticate('google').then((response) => {
      if (response.data) {
        setLocalStorage(instance, response.data);
      }

      instance.authSubmitted = false;
    }, (error) => {
      instance.authSubmitted = false;
    });
  }

  login() {
    let instance = this;
    instance.authSubmitted = true;
    let payload = { email: this.username, password: this.password };
    this.api.userLogin(payload)
      .then(function (response) {
        if (response) {
          setLocalStorage(instance, response);
        }

        instance.authSubmitted = false;
      }, function (error) {
        instance.authSubmitted = false;
      });
  }
}

function setLocalStorage(instance, tokenData) {
  localStorage.setItem('userToken', JSON.stringify(tokenData));
  let userInfo = jwtDecode(tokenData.token);
  instance.api.getUser(userInfo.id).then(function (response) {
    localStorage.setItem('userInfo', JSON.stringify(response));
    instance.location.path('/');
  });
}

LoginController.$inject = ['api', 'notifications', '$location', '$auth'];
