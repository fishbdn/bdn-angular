/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

var kinveyInitialized = false;

// Declare app level module which depends on other modules
var app = angular.module('demoApp', [
    'ngRoute',
    'as.sortable',
    'ui.bootstrap',
    'kinvey', 
    'api_keys'
  ])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false); // testing issue #144
  }])
  // Routes configuration
  .config(['$routeProvider', function ($routeProvider) {
    //$routeProvider.when('/', {templateUrl: 'views/kanban.html'});
    $routeProvider.when('/cra', {templateUrl: 'views/cra.html', controller: 'CraController'});
    $routeProvider.when('/kanban', {templateUrl: 'views/kanban.html', controller: 'KanbanController'});
    $routeProvider.when('/sprint', {templateUrl: 'views/sprint.html', controller: 'SprintController'});
    $routeProvider.when('/clone', { templateUrl: 'views/clone.html', controller: 'CloneController' });
    $routeProvider.when('/ctrlclone', { templateUrl: 'views/ctrlClone.html', controller: 'CtrlCloneController' });
    $routeProvider.when('/horizontal', {templateUrl: 'views/horizontal.html', controller: 'HorizontalController'});
    $routeProvider.when('/grid', {templateUrl: 'views/grid.html', controller: 'GridController'});
    $routeProvider.when('/block', {templateUrl: 'views/block.html', controller: 'BlockController'});
    $routeProvider.when('/scrollable', {templateUrl: 'views/scrollable.html', controller: 'ScrollableController'});
    $routeProvider.when('/table', {templateUrl: 'views/table.html', controller: 'TableController'});
    $routeProvider.otherwise({redirectTo: '/kanban'});
  }])
  // Application Controller
  .controller('AppController', ['$scope', '$location', '$kinvey', function ($scope, $location, $kinvey) {
    $scope.isActive = function (viewLocation) {
      var active = false;
      if ($location.$$path.lastIndexOf(viewLocation, 0) != -1) {
        active = true;
      }
      return active;
    };
  }]
);

// Kinvey (DataStore) initialisation
app.run(KinveyInit);

KinveyInit.$inject = ['$kinvey', '$rootScope', '$location', 'KINVEY_CONFIG'];
function KinveyInit($kinvey, $rootScope, $location, KINVEY_CONFIG) {
  console.log("Kinvey intitialize : ", KINVEY_CONFIG);

    $rootScope.$on('$locationChangeStart', function(event, newUrl) {
        
        if (!kinveyInitialized) {
            event.preventDefault(); // Stop the location change
            
            // Initialize Kinvey
            $kinvey.init(KINVEY_CONFIG).then(function() {
                kinveyInitialized = true;
                $location.path($location.url(newUrl).hash); // Go to the page
            }, function(err) {
                alert('Kinvey Ping Failed. Response: ' + err.description);
            });
        }
    });
};

/*
// Other way (as defined in kinvey Getting Started)
app.constant('kinveyConfig', {
    appKey: 'kid_Z13U8i_XMb',
    appSecret: '80aad81e32ba438597bd447bff4de563'
});
app.run(['$kinvey', '$rootScope', '$location', 'kinveyConfig', function($kinvey, $rootScope, $location, kinveyConfig) {
    
  console.log("kinveyConfig", kinveyConfig);
    $rootScope.$on('$locationChangeStart', function(event, newUrl) {
        if (!kinveyInitialized) {
            event.preventDefault(); // Stop the location change
            // Initialize Kinvey
            $kinvey.init(kinveyConfig).then(function() {
                kinveyInitialized = true;
                $location.path($location.url(newUrl).hash); // Go to the page
            }, function(err) {
                alert('Kinvey Ping Failed. Response: ' + err.description);
            });
        }
    });
}]);
*/
