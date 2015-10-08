angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo','chart.js'])
//angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo'])
  .factory('Authorization', function() {

  authorization = {};
  authorization.UnitsPM = "";
  //authorization.Splayer = "";
  return authorization;
  })

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

  .controller('SettingsCtrl', function($scope,Authorization) {
    $scope.input = Authorization;
    window.localStorage['UnitsPM'] = $scope.input.UnitsPM;

    $scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };
    var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];


    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val)
      }
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

  .controller('homeCtrl',function($scope,$timeout,Authorization){

    $scope.input = Authorization;
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

    $scope.Tdate = todayDate();

    var createUnitsPerMonth = function(Units) {
      // craeate Units per month in local
      window.localStorage['UnitsPM'] = Units;
      $scope.input.UnitsPM = Units;

    };

    var getUnitsPerMonth = function(){
      // get Units per month from local
      $scope.input.UnitsPM = window.localStorage['UnitsPM'];
      return $scope.input.UnitsPM;

    };


    $timeout(function() {
      if(true) {            //need to add conditions getUnitsPerMonth() == null
        while(true) {
          var UnitsPmonth = prompt('Desired Monthly payment:');
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

  //// Optional configuration
  //.config(['ChartJsProvider', function (ChartJsProvider) {
  //  // Configure all charts
  //  ChartJsProvider.setOptions({
  //    colours: ['#FF5252', '#FF8A80'],
  //    responsive: false
  //  });
  //  // Configure all line charts
  //  ChartJsProvider.setOptions('Line', {
  //    datasetFill: false
  //  });
  //}])

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



