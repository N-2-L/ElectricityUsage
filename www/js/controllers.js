angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo','chart.js'])
//angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("progressBar",function($scope,$timeout){
  var amt = 66;

  $scope.countTo = amt;
  $scope.countFrom = 0;

  $timeout(function(){
    $scope.progressValue = amt;
  }, 200);

})

  .controller('homeCtrl',function($scope,$timeout){
    $timeout(function() {
      if(1> 0) {            //need to add conditions
        while(true) {
          var UnitsPmonth = prompt('Units per Month:');
          var MonthStartDate = prompt('Month Start Date:');
          if(UnitsPmonth && MonthStartDate) {
            createProject(projectTitle);// need to change
            break;
          }
        }
      }
    });

  })

  // Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }])

  .controller('LineCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    // Simulate async data update
    $timeout(function () {
      $scope.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [65, 59, 80, 81, 56, 55, 40]
      ];
    }, 3000);
  }]);



//var myApp = angular.module("myApp", ["ui.bootstrap","countTo"]);
//
//myApp.controller("progressBar",function($scope,$timeout){
//
//  var amt = 66;
//
//  $scope.countTo = amt;
//  $scope.countFrom = 0;
//
//  $timeout(function(){
//    $scope.progressValue = amt;
//  }, 200);
//
//});

// http://angular-ui.github.io/bootstrap/#/progressbar
// https://github.com/sparkalow/angular-count-to
