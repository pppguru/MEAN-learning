require('ng-notifications-bar');

routing.$inject = ['$urlRouterProvider', '$locationProvider','notificationsConfigProvider'];

export default function routing($urlRouterProvider, $locationProvider, notificationsConfig) {
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  
    // auto hide
    notificationsConfig.setAutoHide(true);

    // delay before hide
    notificationsConfig.setHideDelay(1500);
}