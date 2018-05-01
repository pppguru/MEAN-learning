import angular from 'angular';
import uirouter from 'angular-ui-router';

import ExamController from './../controllers/exam.controller';

export default angular.module('app.exam', [uirouter])
  .controller('ExamController', ExamController)
  .name;