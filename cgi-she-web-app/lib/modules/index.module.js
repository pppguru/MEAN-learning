import angular from 'angular';
import IndexController from './../controllers/index.controller';

//I'd like to be able to define all of the controllers here
export default angular.module('app.index', [])
  .controller('IndexController', IndexController)
  .name;