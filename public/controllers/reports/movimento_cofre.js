angular.module("movimentoCofreApp", [])
.controller("movimentoCofreController", ['$scope', '$http', function ($scope, $http){
    $scope.formData = {};

    $http.get('/model/cliente/Terminais')
        .success(function(terms) {
			var terminais = "";
			for (var i = 0; i < terms.length; i++) {
				terminais += terms[i].NR_TERMINAL + ",";
			}
			/*
			terminais
			identificador
			dt_inicial
			dt_final
			*/
			$http.get('/model/cliente/MovimentoCofre?terminais=' + terminais)
				.success(function(data) {
					console.log(data);
					console.log(JSON.stringify(data));
					
					$scope.lancamentos = data[0];
				})
				.error(function(data) {
					console.log('movimentoCofreApp::movimentoCofreController - Error getting data: ' + data);
				});
		})
		.error(function(data) {
			console.log('movimentoCofreApp::movimentoCofreController - Error getting terminals: ' + data);
		});	
}]);

