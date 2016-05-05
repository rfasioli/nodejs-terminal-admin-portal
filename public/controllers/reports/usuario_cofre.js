angular.module("usuarioCofreApp", [])
.controller("usuarioCofreController", ['$scope', '$http', function ($scope, $http){
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
			usuario
			biometria
			*/
			$http.get('/model/cliente/UsuarioCofre?terminais=' + terminais)
				.success(function(data) {
					$scope.usuarios = data[0];
				})
				.error(function(data) {
					console.log('usuarioCofreApp::usuarioCofreController - Error getting data: ' + data);
				});
		})
		.error(function(data) {
			console.log('usuarioCofreApp::usuarioCofreController - Error getting terminals: ' + data);
		});	
}]);

