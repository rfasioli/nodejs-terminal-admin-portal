var CarregaClass = function($scope) {
	for (var i = 0; i < $scope.terminais.length; i++) {
		switch ($scope.terminais[i].ST_TERMINAL)
		{
			case 11:
			case 14:
				$scope.terminais[i].CLASS_TERMINAL = "fa fa-exclamation fa-1g";
				break;
			case 10:
				$scope.terminais[i].CLASS_TERMINAL = "fa fa-check fa-1g";
				break;
			case 12:
				$scope.terminais[i].CLASS_TERMINAL = "fa fa-stop-circle fa-1g";
				break;
			default:
				$scope.terminais[i].CLASS_TERMINAL = "fa fa-bug fa-1g";
				break;
		}

		switch ($scope.terminais[i].ST_VALIDADOR)
		{
			case 29:
				$scope.terminais[i].CLASS_VALIDADOR = "fa fa-stop-circle fa-1g";
				break;
			case 21:
				$scope.terminais[i].CLASS_VALIDADOR = "fa fa-bug fa-1g";
				break;
			default:
				$scope.terminais[i].CLASS_VALIDADOR = "fa fa-check fa-1g";
				break;
		}

		switch ($scope.terminais[i].ST_IMPRESSORA)
		{
			case 12:
				$scope.terminais[i].CLASS_IMPRESSORA = "fa fa-exclamation fa-1g";
				break;
			case 10:
				$scope.terminais[i].CLASS_IMPRESSORA = "fa fa-check fa-1g";
				break;
			case 19:
				$scope.terminais[i].CLASS_IMPRESSORA = "fa fa-stop-circle fa-1g";
				break;
			default:
				$scope.terminais[i].CLASS_IMPRESSORA = "fa fa-bug fa-1g";
				break;
		}
		
		switch ($scope.terminais[i].ST_BIOMETRIA)
		{
			case 30:
				$scope.terminais[i].CLASS_BIOMETRIA = "fa fa-check fa-1g";
				break;
			case 39:
				$scope.terminais[i].CLASS_BIOMETRIA = "fa fa-stop-circle fa-1g";
				break;
			default:
				$scope.terminais[i].CLASS_BIOMETRIA = "fa fa-bug fa-1g";
				break;
		}
               
		switch ($scope.terminais[i].ST_PORTA)
		{
			case 41:
				$scope.terminais[i].CLASS_PORTA = "fa fa-exclamation fa-1g";
				break;
			case 40:
				$scope.terminais[i].CLASS_PORTA = "fa fa-check fa-1g";
				break;
			case 49:
				$scope.terminais[i].CLASS_PORTA = "fa fa-stop-circle fa-1g";
				break;
			default:
				$scope.terminais[i].CLASS_PORTA = "fa fa-bug fa-1g";
				break;
		}
		
	}
}

var carregaMonitoramento = function($scope, $http, $timeout) {
    $http.get('/model/cliente/monitoramento')
        .success(function(data) {
            $scope.terminais = data;
			CarregaClass($scope);
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

