import angular from 'angular';
import uirouter from 'angular-ui-router';

import LoginController from './../controllers/login.controller';

export default angular.module('app.login', [uirouter])
  .controller('LoginController', LoginController)
  .name;