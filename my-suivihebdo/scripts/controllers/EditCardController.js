/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('demoApp').controller('EditCardController', ['$scope', '$uibModalInstance', 'column', 'card', function ($scope, $uibModalInstance, column, card) {

  // var vm = this;
  // var currentCard = 'test';
  // var currentColumn;

  initScope($scope);

  // console.log("modal $scope", $scope);


  function initScope(scope) {
    console.log("modal $scope", $scope);
    
    scope.currentColumn = column;
    scope.currentCard = card;
    // currentCard = card;
    // currentColumn = column;
  }

  $scope.editCard = function () {
    if (!this.editCardForm.$valid) {
      return false;
    }
    // $uibModalInstance.close({title: this.title, column: column, card:card});
    
    // On ne fait rien de particulier, on a tapé direct dans le scope
    console.log("edit $scope.weekBoard", $scope.weekBoard);

    console.log("edit $scope.currentCard", $scope.currentCard);

    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.close();
  };



}]);

