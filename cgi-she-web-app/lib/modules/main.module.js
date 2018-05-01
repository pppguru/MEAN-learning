import angular from 'angular';
import uirouter from 'angular-ui-router';
require('./../main.less');

import routing from './../routes/main.routes';
import MainController from './../controllers/main.controller';

//I'd like to be able to define all of the controllers here
export default angular.module('app.main', [uirouter])
  .config(routing)
  .controller('MainController', MainController)
  .name;