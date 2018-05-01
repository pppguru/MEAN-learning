import angular from 'angular';

angular
    .module('cgiSheApp')
    .service('logger', logger);

function logger() {
  this.logError = function(msg) {
    /* */
  };
}