angular.module("fechamentoApp", [])
.controller("fechamentoController", ['$scope', '$http', function ($scope, $http){
    $scope.formData = {};

    $http.get('/model/cliente/Coletas')
        .success(function(data) {
            $scope.coletas = data;
        })
        .error(function(data) {
            console.log('fechamentoApp::fechamentoController - Error: ' + data);
        });
	
}]);

