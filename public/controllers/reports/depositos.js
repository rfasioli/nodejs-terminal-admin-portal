angular.module("depositosApp", [])
.controller("depositosController", ['$scope', '$http', function ($scope, $http){
    $scope.formData = {};

    $http.get('/model/cliente/Depositos')
        .success(function(data) {
			console.log('depositosApp::depositosController - data [', data, ']');
            $scope.depositos = data;
        })
        .error(function(data) {
            console.log('depositosApp::depositosController - Error: ' + data);
        });
	
}]);

