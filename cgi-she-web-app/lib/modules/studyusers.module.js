import angular from 'angular';
import uirouter from 'angular-ui-router';

import StudyUsersController from './../controllers/studyusers.controller';

export default angular.module('app.question', [uirouter])
  .controller('StudyUsersController', StudyUsersController)
  .name;