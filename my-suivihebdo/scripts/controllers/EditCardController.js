/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('demoApp').controller('EditCardController', ['$scope', '$uibModalInstance', 'column', 'card', function ($scope, $uibModalInstance, column, card) {

  function initScope(scope) {
    scope.columnName = column.name;
    scope.column = column;
    scope.card = card;
  }

  $scope.editCard = function () {
    if (!this.editCardForm.$valid) {
      return false;
    }
    $uibModalInstance.close({title: this.title, column: column, card:card});
  };

  $scope.close = function () {
    $uibModalInstance.close();
  };

  initScope($scope);

}]);

