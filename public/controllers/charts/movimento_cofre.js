angular.module("ChartMovimentoCofreApp", ["chart.js"])
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
  .controller("ChartMovimentoCofreCtrl", ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.labels = ["29/04", "30/04", "01/05", "02/05", "03/05", "04/05", "05/05"];
  $scope.series = ['Numerário', 'Envelope', 'Cheque'];
  $scope.data = [
	[65, 59, 80, 81, 56, 55, 40],
	[28, 48, 40, 19, 86, 27, 90],
	[10, 5, 7, 12, 1, 27, 18]
  ];
  $scope.onClick = function (points, evt) {
	console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
	$scope.data = [
	  [28, 48, 40, 19, 86, 27, 90],
	  [65, 59, 80, 81, 56, 55, 40],
	  [3, 5, 7, 12, 27, 38, 82]
	];
  }, 3000);
}]);
