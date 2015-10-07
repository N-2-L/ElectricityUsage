//angular.module('electricityUsage.controllers', [])
angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo'])

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

  });



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
