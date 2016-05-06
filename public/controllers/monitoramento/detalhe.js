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

var formataStTerminal = function ($scope, _st)
{
	$scope.terminal.st = _st;
	switch (_st) {
	case 13:
		$scope.terminal.imagem = "/images/coacao.png";
		$scope.terminal.texto = "Coação";
		break;
	case 11:
		$scope.terminal.imagem = "/images/emcoleta.png";
		$scope.terminal.texto = "Em coleta";
		break;
	case 12:
		$scope.terminal.imagem = "/images/manutencao.png";
		$scope.terminal.texto = "Em manutenção";
		break;
	case 10:
		$scope.terminal.imagem = "/images/ok.png";
		$scope.terminal.texto = "Monitorando";
		break;
	case 14:
		$scope.terminal.imagem = "/images/pendencia.png";
		$scope.terminal.texto = "Resolver pendência";
		break;
	case 99:
		$scope.terminal.imagem = "/images/semconexao.png";
		$scope.terminal.texto = "Sem conexão";
		break;
	}
}

var formataStImpressora = function ($scope, _st)
{
	$scope.impressora=[];
	$scope.impressora.st = _st;
	switch (_st) {
	case 10:
		$scope.impressora.imagem = "/images/OK.png";
		$scope.impressora.texto = "Impressora OK";
		break;
	case 12:
		$scope.impressora.imagem = "/images/sempapel.png";
		$scope.impressora.texto = "Impressora sem papel";
		break;
	case 11:
		$scope.impressora.imagem = "/images/erro.png";
		$scope.impressora.texto = "Erro na Impressora";
		break;
	case 19:
		$scope.impressora.imagem = "/images/naohabilitado.png";
		$scope.impressora.texto = "Impressora não habilitada";
		break;
	}
}

var formataStBiometria = function ($scope, _st)
{
	$scope.biometria=[];
	$scope.biometria.st = _st;
	switch (_st)
	{
	case 30:
		$scope.biometria.imagem = "/images/ok.png";
		$scope.biometria.texto = "Biometria OK";
		break;
	case 31:
		$scope.biometria.imagem = "/images/erro.png";
		$scope.biometria.texto = "Erro na Biometria";
		break;
	case 39:
		$scope.biometria.imagem = "/images/naohabilitado.png";
		$scope.biometria.texto = "Biometria não habilitado";
		break;
	}
}

var formataStValidador = function ($scope, _st)
{
	$scope.validador=[];
	$scope.validador.st = _st;
	switch (_st)
	{
	case 20:
		$scope.validador.imagem = "/images/ok.png";
		$scope.validador.texto = "Validador OK";
		break;
	case 21:
		$scope.validador.imagem = "/images/erro.png";
		$scope.validador.texto = "Erro no Validador";
		break;
	case 29:
		$scope.validador.imagem = "/images/naohabilitado.png";
		$scope.validador.texto = "Validador não habilitado";
		break;
	}
}

var formataStPorta = function ($scope, _st)
{
	//Status Porta Cofre
	$scope.porta=[];
	$scope.porta.st = _st;
	switch (_st)
	{
	case 42:
		$scope.porta.imagem = "/images/alerta.png";
		$scope.porta.texto = "Porta Cofre aberta";
		break;
	case 41:
		$scope.porta.imagem = "/images/alerta.png";
		$scope.porta.texto = "Porta Cofre fechada e destrancada";
		break;
	case 40:
		$scope.porta.imagem = "/images/portacofrefechadatrancada.png";
		$scope.porta.texto = "Porta Cofre fechada e trancada";
		break;
	case 49:
		$scope.porta.imagem = "/images/naohabilitado.png";
		$scope.porta.texto = "Porta Cofre não habilitado";
		break;
	}			
}

var carregaEventos = function($scope, $http, $timeout) {
	var nr_terminal = getQueryVariable('nr_terminal');
    $http.get('/model/cliente/ConsultaEventos?nr_terminal=' + nr_terminal)
        .success(function(data) {
            $scope.eventos = data[0];
			$timeout(function () {carregaEventos($scope, $http, $timeout);}, 3000);
        })
        .error(function(data) {
            console.log('carregaEventos - Error: ' + data);
        });
}	

var carregaDadosTerminal = function($scope, $http, $timeout) {
	var nr_terminal = getQueryVariable('nr_terminal');
	console.log("carregaDadosTerminal");

    $http.get('/model/cliente/monitoramento?nr_terminal=' + nr_terminal)
        .success(function(data) {
			console.log($scope.terminal);
            $scope.terminal = data[0];

			formataStTerminal ($scope, data[0].ST_TERMINAL);
			formataStImpressora ($scope, data[0].ST_IMPRESSORA);
			formataStBiometria ($scope, data[0].ST_BIOMETRIA);
			formataStValidador ($scope, data[0].ST_VALIDADOR);
			formataStPorta ($scope, data[0].ST_PORTA);
			
			$timeout(function () {carregaDadosTerminal($scope, $http, $timeout);}, 3000);
        })
        .error(function(data) {
            console.log('carregaDadosTerminal: ' + data);
        });
}

angular.module("detalheTerminalApp", [])
  .controller("eventosTerminalController", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout)
  {
    $scope.formData = {};	
	carregaEventos($scope, $http, $timeout);
 	carregaDadosTerminal($scope, $http, $timeout);
 }])
  .controller("estadoTerminalController", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout)
  {
    $scope.formData = {};
	carregaDadosTerminal($scope, $http, $timeout);
   }])
;

