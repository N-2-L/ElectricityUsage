angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo','chart.js'])
//angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo'])

  .factory('UnitsFac', function() {
    return {
      all: function() {
        var projectString = window.localStorage['projects'];
        if(projectString) {
          return angular.fromJson(projectString);
        }
        return [];
      },
      save: function(projects) {
        window.localStorage['projects'] = angular.toJson(projects);
      },
      newProject: function(projectTitle) {
        // Add a new project
        return {
          title: projectTitle,
          tasks: []
        };
      },
      getLastActiveIndex: function() {
        return parseInt(window.localStorage['lastActiveProject']) || 0;
      },
      setLastActiveIndex: function(index) {
        window.localStorage['lastActiveProject'] = index;
      }
    }
  })
///////////////////////////////////////////////////////////


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

    // generates today date!
    var todayDate = function(){

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd='0'+dd
      }

      if(mm<10) {
        mm='0'+mm
      }

      today = mm+'/'+dd+'/'+yyyy;

      return today;
    };


    var createUnitsPerMonth = function(Units) {
      // craeate Units per month in local
      window.localStorage['UnitsPM'] = Units;
      $scope.UnitsPM = Units;

    };

    var getUnitsPerMonth = function(){
      // get Units per month from local
      $scope.UnitsPM = window.localStorage['UnitsPM'];
      return $scope.UnitsPM;

    };


    $timeout(function() {
      if(getUnitsPerMonth() == null) {            //need to add conditions
        while(true) {
          var UnitsPmonth = prompt('Units per Month:');
          var MonthStartDate = prompt('Month Start Date:');
          if(UnitsPmonth && MonthStartDate) {
            //createProject(projectTitle);// need to change
            createUnitsPerMonth(UnitsPmonth);
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
      datasetFill: true
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



