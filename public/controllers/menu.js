function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
	var pair = vars[i].split("=");
	if (pair[0] == variable) {
	  return pair[1];
	}
  } 
  // alert('Query Variable ' + variable + ' not found');
}      

angular.module("menuApp", [])
.controller("montaMenuCtrl", ['$scope', '$http', function ($scope, $http){
    $scope.formData = {};
	
	console.log($scope.perfil);
	console.log(getQueryVariable('perfil'));

    // $http.get('/model/cliente/MenuPerfil?id_perfil=')
        // .success(function(data) {
            // $scope.terminais = data;
        // })
        // .error(function(data) {
            // console.log('monitoramento::monitoracaoController - Error: ' + data);
        // });
	
}]);

