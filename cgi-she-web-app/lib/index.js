'use strict';

require('./base.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';
import satellizer from 'satellizer';

import routing from './app.config';
import account from './modules/account.module';
import choice from './modules/choice.module';
import category from './modules/category.module';
import exam from './modules/exam.module';
import index from './modules/index.module';
import login from './modules/login.module';
import main from './modules/main.module';
import user from './modules/user.module';
import studyusers from './modules/studyusers.module';

//import phDirective from './directives/phoneinput.directive';
//import tel from './filters/tel.filter';

require('ng-notifications-bar');

import api from './services/api.service';
import auth from './services/auth.service';

function httpInterceptor() {
  return {
    request: function(config) {
      if (localStorage['userToken'] != null)
        config.headers['Authorization'] = JSON.parse(localStorage['userToken']).token;
      return config;
    },

    requestError: function(config) {
      return config;
    },

    response: function(res) {
      return res;
    },

    responseError: function(res) {
      return res;
    }
  }
}

angular.module('cgiSheApp', [uirouter,account,login,main,user,exam,index,choice,category,studyusers,
                    api,auth,'ngNotificationsBar', satellizer])
  .factory('httpInterceptor', httpInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');  
  })
  .config(routing)
  .run(function($rootScope, auth, $state) {

  // Listen to '$locationChangeSuccess', not '$stateChangeStart'
  $rootScope.$on('$locationChangeSuccess', function() {
      if (!auth.loggedIn()) {
        // redirect to login if auth fails
        $state.go('login')
      }
  })
})