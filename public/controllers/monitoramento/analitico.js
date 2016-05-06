var carregaDadosGrafico = function($scope, $http, $timeout) {
    $http.get('/model/cliente/TotaisDeposito')
        .success(function(data) {
			var labels = [], dinheiro = [], cheque = [], envelope = [];
			for (var i = 0; i < data.length; i++) {
				labels.push(data[i].DATA);
				dinheiro.push(data[i].VL_DINHEIRO);
				cheque.push(data[i].VL_CHEQUE);
				envelope.push(data[i].VL_ENVELOPE);
			}
			$scope.series = ['Dinheiro', 'Envelope', 'Cheque'];
			$scope.labels = labels;
			$scope.data = [dinheiro, envelope, cheque];
			
			$timeout(function () {carregaDadosGrafico($scope, $http, $timeout);}, 10000);
        })
        .error(function(data) {
            console.log('carregaDadosGrafico - Error: ' + data);
        });	
}

var carregaDadosGraficoTerminais = function($scope, $http, $timeout) {
	
    $http.get('/model/cliente/TerminaisDisponiveis')
        .success(function(data) {
			var labels = [], erro = [], ok = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].ST == 0) ok.push(data[i].QTD);
				else                 erro.push(data[i].QTD);
			}
			$http.get('/model/cliente/ValidadoresDisponiveis')
				.success(function(data) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].ST == 0) ok.push(data[i].QTD);
						else                 erro.push(data[i].QTD);
					}
					$http.get('/model/cliente/ImpressorasDisponiveis')
						.success(function(data) {
							for (var i = 0; i < data.length; i++) {
								if (data[i].ST == 0) ok.push(data[i].QTD);
								else                 erro.push(data[i].QTD);
							}
							$http.get('/model/cliente/BiometriasDisponiveis')
								.success(function(data) {
									for (var i = 0; i < data.length; i++) {
										if (data[i].ST == 0) ok.push(data[i].QTD);
										else                 erro.push(data[i].QTD);
									}
									$http.get('/model/cliente/PortasDisponiveis')
										.success(function(data) {
											for (var i = 0; i < data.length; i++) {
												if (data[i].ST == 0) ok.push(data[i].QTD);
												else                 erro.push(data[i].QTD);
												$scope.terminal = [];
												$scope.terminal.series = ['OK', 'Erro'];
												$scope.terminal.labels = ['Terminal', 'Validador', 'Impressora', 'Biometria', 'Porta'];
												$scope.terminal.data = [ok, erro];
												$timeout(function () {carregaDadosGraficoTerminais($scope, $http, $timeout);}, 10000);
											}
										})
										.error(function(data) {
											console.log('carregaDadosGraficoTerminais - Error: ' + data);
										});
								})
								.error(function(data) {
									console.log('carregaDadosGraficoTerminais - Error: ' + data);
								});
						})
						.error(function(data) {
							console.log('carregaDadosGraficoTerminais - Error: ' + data);
						});
				})
				.error(function(data) {
					console.log('carregaDadosGraficoTerminais - Error: ' + data);
				});
		})
        .error(function(data) {
            console.log('carregaDadosGraficoTerminais - Error: ' + data);
        });	
}

var carregaMonitoramentoAnalitico = function($scope, $http, $timeout) {
    $http.get('/model/cliente/MonitoramentoAnalitico')
        .success(function(data) {
            $scope.estado = data[0];
			$timeout(function () {carregaMonitoramentoAnalitico($scope, $http, $timeout);}, 3000);
		})
        .error(function(data) {
            console.log('carregaMonitoramentoAnalitico - Error: ' + data);
        });
}

var carregaNumerarioSaldoAnalitico = function($scope, $http, $timeout) {
    $http.get('/model/cliente/NumerarioSaldoAnalitico')
        .success(function(data) {
            $scope.transito = data[0].NUMERARIO;
			$timeout(function () {carregaNumerarioSaldoAnalitico($scope, $http, $timeout);}, 3000);
        })
        .error(function(data) {
            console.log('carregaNumerarioSaldoAnalitico - Error: ' + data);
        });
}

var carregaNumerarioRecolhidoAnalitico = function($scope, $http, $timeout) {
    $http.get('/model/cliente/NumerarioRecolhidoAnalitico')
        .success(function(data) {
            $scope.recolhido = data[0].NUMERARIO;
			$timeout(function () {carregaNumerarioRecolhidoAnalitico($scope, $http, $timeout);}, 3000);
        })
        .error(function(data) {
            console.log('carregaNumerarioRecolhidoAnalitico - Error: ' + data);
        });
}

angular.module("monitoramentoApp", ["chart.js"])
  // Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
	// Configure all charts
	ChartJsProvider.setOptions({
	  colours: ['#FF0000', '#00FF00', '#0000FF'],
	  responsive: true
	});
	// Configure all line charts
	ChartJsProvider.setOptions('Line', {
	  datasetFill: true
	});
  }])
  .controller("monitoramentoAnaliticoCtrl", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout){
    $scope.formData = {};
	
	carregaDadosGrafico($scope, $http, $timeout);
	carregaDadosGraficoTerminais($scope, $http, $timeout)
	carregaMonitoramentoAnalitico($scope, $http, $timeout);
	carregaNumerarioSaldoAnalitico($scope, $http, $timeout);
	carregaNumerarioRecolhidoAnalitico($scope, $http, $timeout);

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
	
  }]);

  
