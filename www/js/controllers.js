angular.module('electricityUsage.controllers', ['ui.bootstrap','countTo','chart.js'])

  .factory('Authorization', function() {

  authorization = {};
  authorization.UnitsPM = "";
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
  .controller('SettingsCtrl', function($scope,Authorization) {
    $scope.input = Authorization;
    window.localStorage['UnitsPM'] = $scope.input.UnitsPM;

    $scope.datepickerObject = {
      titleLabel: 'Date Picker',  //Optional
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

.controller("progressBar",function($scope,$timeout,Authorization){
    $scope.input = Authorization;

    var amt = $scope.input.count;

    console.log("inside pro" + $scope.input.count);

    $scope.countTo = amt;
    $scope.countFrom = 0;

    $timeout(function(){
      $scope.progressValue = amt;
    }, 200);


})

  .controller('homeCtrl',function($scope,$timeout,Authorization){

    $scope.DesiredUnits = null;

    var /**
     * @return {number}
     */
    BillAlgo = function(amount){

      var units = 0;
      if (amount< 502.40){
        units = (amount/7.85);
      }
      else if(502.40 < amount && amount<822.40){
        units =  ((amount-502.40)/10 + 64);
      }
      else if(822.40<amount<1710.40){
        units = 96 + ((amount-822.40)/27.75);
      }
      else if(1710.40 < amount <3758.40){
        units = 128 + ((amount-1710.40)/32);
      }
      else if(3758.40<amount){
        units = 192 + ((amount-3758.40)/45);
      }

      return units;

    };





    var toPay= null;
    var MoneytoPayAlgo = function(units){

      if(units<64){
        toPay = units*7.85;
      }
      else if(64 < units < 96){
        toPay = (units-64)*10 + 502.40;
      }
      else if(96 < units < 128){
        toPay = (units-96)*27.75 + 822.40;

      }
      else if(128 < units < 192){
        toPay = (units-128)*32 + 1710.40;

      }
      else if(units > 192){
        toPay = (units-192)*45 +3758.40;
      }

      return toPay;
    };




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

    var createAmountPerMonth = function(Amount) {
      // craeate Amount per month in local
      window.localStorage['AmountPM'] = Amount;
      $scope.input.AmountPM = Amount;
    };

    var getAmountPerMonth = function(){
      // get Amount per month from local
      $scope.input.AmountPM = window.localStorage['AmountPM'];
      return $scope.input.AmountPM;
    };

    var createStartDate = function(Date) {
      // create billing period starting date in local
      window.localStorage['BillingStartDate'] = Date;
      $scope.input.BillingStartDate = Date;
    };

    var getStartDate = function(){
      // get billing period starting date from local
      $scope.input.BillingStartDate = window.localStorage['BillingStartDate'];
      return $scope.input.BillingStartDate;
    };

    //count for the units increase button
    $scope.input.count = 0;

    $scope.countUnits = function() {
      console.log($scope.input.count);
      $scope.input.count += 1;
      $scope.MoneyToPay = MoneytoPayAlgo($scope.input.count);
    };

    //function to calculate remaining days
    //calculate the remaining days in a proper way if in next month
    var calculateRemainingDays = function(billingDate){
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var today = new Date();
      var thisMonthBillingDate = new Date(today.getFullYear(),today.getMonth(),billingDate);
      if(thisMonthBillingDate.getTime()>today.getTime()){
        $scope.remainingDays = Math.round(Math.abs((today.getTime() - thisMonthBillingDate.getTime())/(oneDay)));
      }else{
        $scope.remainingDays = 30 - Math.round(Math.abs((today.getTime() - thisMonthBillingDate.getTime())/(oneDay)));
      }
    };

    $timeout(function() {
      if(true) {            //need to add conditions getAmountPerMonth() == null
        while(true) {
          var AmountPMonth = prompt('Desired Monthly payment:');
          var MonthStartDate = prompt('Billing Period Start Date:');
          $scope.DesiredUnits = BillAlgo(AmountPMonth); // taking desiredUnits count to dash
          if(AmountPMonth && MonthStartDate) {
            createAmountPerMonth(AmountPMonth);
            createStartDate(MonthStartDate);
            break;
          }
        }
        //calculate remaining days
        calculateRemainingDays(MonthStartDate);
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

  .controller('GraphCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

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



