angular.module("numerarioApp", [])
.controller("numerarioController", ['$scope', '$http', function ($scope, $http){
    $scope.formData = {};

    $http.get('/model/cliente/Terminais')
        .success(function(terms) {
			var terminais = "";
			for (var i = 0; i < terms.length; i++) {
				terminais += terms[i].NR_TERMINAL + ",";
			}
			$http.get('/model/cliente/Numerario?terminais=' + terminais)
				.success(function(data) {
					$scope.lancamentos = data[0];
				})
				.error(function(data) {
					console.log('numerarioApp::numerarioController - Error getting data: ' + data);
				});
		})
		.error(function(data) {
			console.log('numerarioApp::numerarioController - Error getting terminals: ' + data);
		});	
}]);

