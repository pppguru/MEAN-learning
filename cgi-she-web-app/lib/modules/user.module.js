require('./../infoicon.png');
require('./../question.less');
require('angular-ui-bootstrap');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import UserController from './../controllers/user.controller';

export default angular.module('app.user', [uirouter,'ui.bootstrap'])
  .controller('UserController', UserController)
  .name;