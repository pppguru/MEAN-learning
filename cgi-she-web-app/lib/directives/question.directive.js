import angular from 'angular';

function question() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      questiontype: '=',
      question: '=',
      prototype: '=',
      questiontitle: '='
    },
    template: require('./../templates/question-directive.html'),
    link: function(scope, element, attrs) {
        scope.$watch('question', function(newValue, oldValue) {
            //Do something here for line breaks
            //if (newValue)
               
        }, true);
      }
  }
}

export default angular.module('directives.question', [])
  .directive('question', question)
  .name;