var carregaMonitoramento = function($scope, $http, $timeout) {
    $http.get('/model/cliente/monitoramento')
        .success(function(data) {
            $scope.terminais = data;
			$timeout(function () {carregaMonitoramento($scope, $http, $timeout);}, 3000);
        })
        .error(function(data) {
            console.log('carregaMonitoramento - Error: ' + data);
        });
}

angular.module("monitoramentoApp", [])
.controller("monitoramentoController", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout){
    $scope.formData = {};
	carregaMonitoramento($scope, $http, $timeout);
}]);

