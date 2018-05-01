require('./../infoicon.png');
require('./../question.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import CategoryController from './../controllers/category.controller';

export default angular.module('app.category', [uirouter])
  .controller('CategoryController', CategoryController)
  .name;