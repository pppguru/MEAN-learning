import angular from 'angular';
import uirouter from 'angular-ui-router';

import AccountController from './../controllers/account.controller';

export default angular.module('app.account', [uirouter])
  .controller('AccountController', AccountController)
  .name;