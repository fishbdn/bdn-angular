angular.module("demoApp")
	.controller("BarCtrl", function ($scope) {
	  
	  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	  $scope.series = ['Series A', 'Series B'];

	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	  ];
	})
	.controller('StackedBarCtrl', function ($scope) {
		
		$scope.labels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
		$scope.type = 'StackedBar';

		// $scope.legend = ['Lot 1', 'Lot 2', 'Lot 3'];

		$scope.series = ['Lot 1', 'Lot 2', 'Lot 3'];

		$scope.data = [
		  	[0, 0, 0, 0, 0, 	0, 0],		// Lot 1
		  	[0, 0, 0.25, 0, 0, 	0, 0],		// Lot 2
	    	[1, 1, 0.5, 0, 0, 	0, 0]		// Lot 3
		];
	});


	;