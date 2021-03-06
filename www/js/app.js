// Ionic electricityUsage App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'electricityUsage' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'electricityUsage.services' is found in services.js
// 'electricityUsage.controllers' is found in controllers.js
angular.module('electricityUsage', ['ionic', 'electricityUsage.controllers', 'electricityUsage.services', 'ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tab.statistics', {
      url: '/stats',
      views: {
        'tab-stats': {
          templateUrl: 'templates/tab-stats.html',
          controller: 'GraphCtrl'
        }
      }
    })
    //.state('tab.chat-detail', {
    //  url: '/chats/:chatId',
    //  views: {
    //    'tab-chats': {
    //      templateUrl: 'templates/chat-detail.html',
    //      controller: 'ChatDetailCtrl'
    //    }
    //  }
    //})

    .state('tab.notifications', {
      url: '/notifications',
      views: {
        'tab-notifications': {
          templateUrl: 'templates/tab-notifications.html',
          controller: 'NotfiCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
