/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('demoApp').controller('CraController', ['$scope', 'BoardService', 'BoardDataFactory', function ($scope, BoardService, BoardDataFactory) {

  // Load data from BoardDataFactory (static stub)
  $scope.weekBoard = BoardService.weekBoard(BoardDataFactory.cra);
  console.log($scope.weekBoard);

  // ng-sortable board options
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

  $scope.removeCard = function (column, card) {
    BoardService.removeCard($scope.weekBoard, column, card);
  };

  $scope.addNewCard = function (column) {
    BoardService.addNewCard($scope.weekBoard, column);
  }

  $scope.editCard = function (column, card) {
    console.log("Edit card : "  + column.name)
    BoardService.editCard($scope.weekBoard, column, card);
  }

}]);

