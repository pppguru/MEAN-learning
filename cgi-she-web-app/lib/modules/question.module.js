require('./../infoicon.png');
require('./../question.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import QuestionController from './../controllers/question.controller';

export default angular.module('app.question', [uirouter])
  .controller('QuestionController', QuestionController)
  .name;