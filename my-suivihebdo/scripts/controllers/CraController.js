/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('demoApp').controller('CraController', 
  ['$scope', '$http', '$kinvey', 'BoardService', 'BoardDataFactory', 'notify', 
  function ($scope, $http, $kinvey, BoardService, BoardDataFactory, notify) {


  // -------- Load Data -------------- //
  
  // ---> From BoardDataFactory (Static)
  // $scope.weekBoard = BoardService.weekBoard(BoardDataFactory.cra);
  // $scope.weekBoard = BoardDataFactory.cra;   // Non mapping in model (direct load)

  // ---> Loading from file 
  /*console.log('Use data stub  : ');
  $http.get('boardData.json').success(function(data) {
    var weekBoard = { cra : data };
    console.log('weekBoard',  weekBoard);

    $scope.weekBoard = weekBoard.cra;
    console.log('$scope.weekBoard',  $scope.weekBoard);
  });*/

  // ---> From External DataStore (Kinvey) 
  // If user authent asked !?
  /*
  var promiseUser = $kinvey.User.login('cracra', 'cracra');
  promiseUser.then(function(user) {
    console.log('cra_user signed up !');
  }, function(err) {
    console.log('!!! cra_user sign-up failed !');
  });
  */
  var promise = $kinvey.DataStore.get('weekBoard', '572cd61596a5494a25f074c7');
  promise.then(function(model) {
      // console.log("Kinvey GET : ", model);
      $scope.weekBoard = model;
  }, function(err) {
      console.log('Erreur Kinvey : Impossible de recuperer le dataStore !' , err);
  });

  // console.log($scope.weekBoard);

  // ---> Loading Mio Tasks
  $http.get('mioTaches.json').success(function(data) {
    var mioTasks = { data };
    console.log('mioTasks',  mioTasks);

    $scope.mioTasks = mioTasks;
    console.log('$scope.mioTasks',  $scope.mioTasks);
  });


  
  // ---- ng-Sortable board config ------- //
  
  $scope.weekSortOptions = {
    //restrict move across columns. move only within column.
    /*accept: function (sourceItemHandleScope, destSortableScope) {
     return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
     },*/
    itemMoved: function (event) {
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
    },
    orderChanged: function (event) {
    },
    containment: '#board'
  };


  // ************** Services **********************/

  $scope.removeCard = function (column, card) {
    BoardService.removeCard($scope.weekBoard, column, card);
  };

  $scope.addNewCard = function (column) {
    BoardService.addNewCard($scope.weekBoard, column);
  };

  $scope.editCard = function (column, card) {
    console.log("Edit card : "  + column.name);
    BoardService.editCard($scope.weekBoard, column, card);
  };

  $scope.saveWeekBoard = function (weekBoard) {
    console.log("Save WeekBoard : ", weekBoard);
    // BoardService.saveWeekBoard($scope.weekBoard);

    // $kinvey.DataStore.update('weekBoard', weekBoard); 


    var promise = Kinvey.DataStore.save('weekBoard', weekBoard);
    promise.then(function(entity) {
        console.log("WeekBoard saved");
        notify('Week board sauvegardé !');
    }, function(error) {
        console.log("! WeekBoard not saved", error);
        notify('Erreur de sauvegardé :' + error);
    });

  };

  $scope.editCard = function (column, card) {
    
    BoardService.editCard($scope.weekBoard, column, card);
  };

  $scope.getSumColConsums = function (column) {
    console.log("Calcul sum column consumptions : "  + column.name);
    if (angular.isDefined(column)) {

      var sum = 0;

      angular.forEach(column.cards, function(value, key) {
        // console.log("sum", sum);
        if (angular.isNumber(value.consum)) {
          sum += value.consum;  
        }

      });
      return sum;
    }
  };

  // **********************************************/

}]);

