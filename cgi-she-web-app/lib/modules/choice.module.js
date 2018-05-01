require('./../infoicon.png');
require('./../question.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import ChoiceController from './../controllers/choice.controller';

export default angular.module('app.choice', [uirouter])
  .controller('ChoiceController', ChoiceController)
  .name;