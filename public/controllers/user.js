angular.module("userApp", [])
.controller("userController", ['$scope', '$http', function ($scope, $http){

var userApp = angular.module('', []);
    $scope.formData = {};

    $http.get('/model/master/Usuario?identificador=' + $scope.identificador)
        .success(function(data) {
            $scope.usuarios = data;
            console.log('monitoramento::monitoracaoController - data - ', data);
        })
        .error(function(data) {
            console.log('monitoramento::monitoracaoController - Error: ' + data);
        });
	
}]);

