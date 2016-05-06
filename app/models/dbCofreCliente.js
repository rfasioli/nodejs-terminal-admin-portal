var sql = require('mssql');
var config = require('config');

var connection = null;

/*
var getConnection = function(conn, callback) {
	if (connection == null) {
		var connectionString = (conn != null ? conn: config.get('Connections.DbCofreCliente'));
		connection = new sql.connect(connectionString).then(function() {
				console.log("dbCofreCliente.js :: Conectou!");
				return callback(connection);
			}).catch(function(err) { 
				console.log("dbCofreMaster.js :: Erro!\n", err);
				return callback(null, err);
			});
	}
	return callback(connection);
}
*/
sql.connect(config.get('Connections.DbCofreCliente')).then(function() {
		console.log("dbCofreCliente.js :: Conectou!");
	}).catch(function(err) { 
		console.log("dbCofreMaster.js :: Erro!\n", err);
	});

var montaClausula = function(where) {
	var result = '';
	for (var i = 0; i < where.length; i++) {
		result += (i == 0 ? ' WHERE ' : ' AND ') + where[i];
	}
	return result;
}

module.exports = {

	ObtemEstadoMonitoramento: function(id, id_terminal, nr_terminal, callback) {
		var myquery = 'SELECT [MON].*, [TER].[NR_TERMINAL], [TER].[DS_TERMINAL], [EST].[DS_NOME_SITE], [FOR].[NM_FORNECEDOR] FROM [TB_MONITORAMENTO] as [MON]';
		myquery += ' INNER JOIN [TB_TERMINAL] AS [TER] ON [TER].[ID_TERMINAL] = [MON].[ID_TERMINAL]'
		myquery += ' INNER JOIN [TB_ESTABELECIMENTO] AS [EST] ON [EST].[ID_ESTABELECIMENTO] = [TER].[ID_ESTABELECIMENTO]'
		myquery += ' INNER JOIN [TB_FORNECEDOR] AS [FOR] ON [FOR].[ID_FORNECEDOR] = [EST].[ID_FORNECEDOR]'
		var where = [];

		if (nr_terminal != null) {
			where.push('[TER].[NR_TERMINAL] = \'' + nr_terminal + '\'');
		}

		if (id  != null) 
			where.push('[MON].[ID_MONITORAMENTO] = ' + id);
		if (id_terminal != null)
			where.push('[MON].[ID_TERMINAL] = \'' + id_terminal + '\'');

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
/*
		//TODO - conexão dinamica pelo cliente selecionado no login
		getConnection(null, function(conn, err) {
			if (err) 
				return callback(null, err);
			console.log('requiring', conn, myquery);

			new sql.Request(conn).query(myquery).then(function(recordset) {
				return callback(recordset);
			}).catch(function(err) {
				return callback(null, err);
			});
		});
		*/
	}
	,
	ObtemEstadoMonitoramentoAnalitico: function(callback) {
		var myquery = 'SELECT ( SELECT count(1) FROM [TB_MONITORAMENTO] WHERE ([ST_TERMINAL] = 10 AND [ST_VALIDADOR] = 20 AND [ST_IMPRESSORA] = 10 AND [ST_BIOMETRIA] = 30 AND [ST_PORTA] = 40 ) ) AS [OK], (SELECT count(1) FROM [TB_MONITORAMENTO] WHERE ([ST_TERMINAL] <> 10 OR [ST_VALIDADOR] <> 20 OR [ST_IMPRESSORA] <> 10 OR [ST_BIOMETRIA] <> 30 OR [ST_PORTA] <> 40 ) ) AS [ERROR];';
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemEventos: function(id, id_local, tp_evento, id_terminal, nr_terminal, cd_dispositivo, dt_inicio, dt_fim, callback) {
		var myquery = 'SELECT [EVT].[ID_EVENTO],[EVT].[ID_TERMINAL],[EVT].[ID_EVENTO_LOCAL],[EVT].[DS_TIPO_EVENTO],[EVT].[DS_EVENTO],[EVT].[DT_EVENTO],[EVT].[CD_DISPOSITVO],[EVT].[DT_SINCRONISMO] FROM [dbo].[TB_EVENTO] AS [EVT]' 
		var where = [];

		if (nr_terminal != null) {
			myquery += ' INNER JOIN [TB_TERMINAL] AS [TER] ON [TER].[ID_TERMINAL] = [EVT].[ID_TERMINAL]'
			where.push('[TER].[NR_TERMINAL] = \'' + nr_terminal + '\'');
		}

		if (id  != null) 
			where.push('[EVT].[ID_EVENTO] = ' + id);
		if (id_local  != null) 
			where.push('[EVT].[ID_EVENTO_LOCAL] = ' + id_local);
		if (tp_evento  != null) 
			where.push('[EVT].[DS_TIPO_EVENTO] = \'' + tp_evento + '\'');
		if (id_terminal != null)
			where.push('[EVT].[ID_TERMINAL] = \'' + id_terminal + '\'');
		if (cd_dispositivo  != null) 
			where.push('[EVT].[CD_DISPOSITVO] = ' + cd_dispositivo);
		if (dt_inicio != null && dt_fim != null)
			where.push('[EVT].[DT_EVENTO] BETWEEN ' + dt_inicio + ' AND ' + dt_fim);

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemEstabelecimentos: function(id, id_fornecedor, id_regiao, callback) {
		var myquery = 'SELECT [EST].[ID_ESTABELECIMENTO], [EST].[ID_FORNECEDOR], [EST].[ID_REGIAO], [EST].[DS_NOME_SITE], [EST].[DS_ENDERECO], [EST].[DS_CIDADE], [EST].[DS_ESTADO], [EST].[NR_TEL_CONTATO], [EST].[NM_CONTATO], [EST].[IC_ATIVO] FROM [TB_ESTABELECIMENTO] AS [EST]'

		var where = [];

		if (id  != null) 
			where.push('[EVT].[ID_ESTABELECIMENTO] = ' + id);
		if (id_fornecedor  != null) 
			where.push('[EVT].[ID_FORNECEDOR] = ' + id_fornecedor);
		if (id_regiao  != null) 
			where.push('[EVT].[ID_REGIAO] = ' + id_regiao);

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemDepositos: function(id, id_local, id_terminal, nr_terminal, nr_malote, nr_envelope, id_identificador, dt_inicio, dt_fim, callback) {
		var myquery = 'SELECT [DEP].*, [TER].[NR_TERMINAL] FROM [TB_DEPOSITO] AS [DEP]'
		myquery += ' INNER JOIN [TB_TERMINAL] AS [TER] ON [TER].[ID_TERMINAL] = [DEP].[ID_TERMINAL]'

		var where = [];

		if (id  != null) 
			where.push('[DEP].[ID_DEPOSITO] = ' + id);
		if (id_local  != null) 
			where.push('[DEP].[ID_DEPOSITO_LOCAL] = ' + id_local);
		if (id_terminal  != null) 
			where.push('[DEP].[ID_TERMINAL] = ' + id_terminal);
		if (nr_terminal != null) 
			where.push('[TER].[NR_TERMINAL] = \'' + nr_terminal +'\'');
		if (nr_malote  != null) 
			where.push('[DEP].[NR_MALOTE] = ' + nr_malote);
		if (nr_envelope  != null) 
			where.push('[DEP].[NR_ENVELOPE] = ' + nr_envelope);
		if (id_identificador  != null) 
			where.push('[DEP].[ID_IDENTIFICADOR] = ' + id_identificador);		
		if (dt_inicio != null && dt_fim != null) {
			where.push('[DEP].[DT_DEPOSITO] BETWEEN ' + dt_inicio + ' AND ' + dt_fim);
		}
		else {
			where.push('[DEP].[DT_DEPOSITO] > DATEADD(D,-10,CURRENT_TIMESTAMP)');
		}

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemColetas: function(id, id_local, id_terminal, nr_terminal, nr_malote, id_identificador, dt_inicio, dt_fim, callback) {
		var myquery = 'SELECT [COL].*, [TER].[NR_TERMINAL] FROM [TB_COLETA] as [COL]'
		myquery += ' INNER JOIN [TB_TERMINAL] AS [TER] ON [TER].[ID_TERMINAL] = [COL].[ID_TERMINAL]'

		var where = [];
		
		if (id  != null) 
			where.push('[COL].[ID_COLETA] = ' + id);
		if (id_local  != null) 
			where.push('[COL].[ID_COLETA_LOCAL] = ' + id_local);
		if (id_terminal  != null) 
			where.push('[COL].[ID_TERMINAL] = ' + id_terminal);
		if (nr_terminal != null) 
			where.push('[TER].[NR_TERMINAL] = \'' + nr_terminal +'\'');
		if (nr_malote  != null) 
			where.push('[COL].[NR_MALOTE] = ' + nr_malote);
		if (id_identificador  != null) 
			where.push('[COL].[ID_IDENTIFICADOR] = ' + id_identificador);		
		if (dt_inicio != null && dt_fim != null) {
			where.push('[COL].[DT_COLETA] BETWEEN ' + dt_inicio + ' AND ' + dt_fim);
		}
		else {
			where.push('[COL].[DT_COLETA] > DATEADD(D,-10,CURRENT_TIMESTAMP)');
		}

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemTerminais: function(id_terminal, nr_terminal, id_estabelecimento, callback) {
		var myquery = 'SELECT [TER].[ID_TERMINAL], [TER].[NR_TERMINAL], [TER].[ID_ESTABELECIMENTO], [TER].[DS_TERMINAL], [TER].[IC_ATIVO] FROM [TB_TERMINAL] AS [TER]'

		var where = [];

		if (id_terminal  != null) 
			where.push('[TER].[ID_TERMINAL] = ' + id_terminal);
		if (nr_terminal  != null) 
			where.push('[TER].[NR_TERMINAL] = ' + nr_terminal);
		if (id_estabelecimento  != null) 
			where.push('[TER].[ID_ESTABELECIMENTO] = ' + id_estabelecimento);		

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemNumerario: function(nr_terminal, callback) {
		new sql.Request()
			.input('NR_TERMINAL', sql.VarChar(sql.Max), nr_terminal)
			.execute('PR_NUMERARIO').then(function(recordsets) {
				return callback(recordsets);
			}).catch(function(err) {
				return callback(null, err);
			});
	}
	,
	ObtemUsuarioCofre: function(nr_terminal, id_identificador, nm_usuario, fl_biometria, callback) {
		var request = new sql.Request();
		
		if (typeof nr_terminal !== 'undefined' && nr_terminal)
			request.input('NR_TERMINAL', sql.VarChar(sql.Max), nr_terminal);
		if (typeof id_identificador !== 'undefined' && id_identificador)
			request.input('ID_IDENTIFICADOR', sql.int, id_identificador);
		if (typeof nm_usuario !== 'undefined' && nm_usuario)
			request.input('NM_USUARIO', sql.VarChar(100), nm_usuario);
		if (typeof fl_biometria !== 'undefined' && fl_biometria)
			request.input('FL_BIOMETRIA', sql.bit, fl_biometria);
		
		request.execute('PR_USUARIO_COFRE').then(function(recordsets) {
			return callback(recordsets);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemMovimentoCofre: function(nr_terminal, id_identificador, dt_inicial, dt_final, callback) {
		var request = new sql.Request();
		
		if (typeof nr_terminal !== 'undefined' && nr_terminal)
			request.input('NR_TERMINAL', sql.VarChar(sql.Max), nr_terminal);
		if (typeof id_identificador !== 'undefined' && id_identificador)
			request.input('ID_IDENTIFICADOR', sql.int, id_identificador);
		if (typeof dt_inicial !== 'undefined' && dt_inicial)
			request.input('DT_INICIAL', sql.Datetime, dt_inicial);
		if (typeof dt_final !== 'undefined' && dt_final)
			request.input('DT_FINAL', sql.Datetime, dt_final);
		
		request.execute('PR_MOVIMENTO_COFRE').then(function(recordsets) {
			return callback(recordsets);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ConsultaEventos: function(nr_terminal, callback) {
		var request = new sql.Request();
		
		if (typeof nr_terminal !== 'undefined' && nr_terminal)
			request.input('NR_TERMINAL', sql.VarChar(sql.Max), nr_terminal);

		request.execute('PW_CONSULTA_EVENTOS').then(function(recordsets) {
			return callback(recordsets);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemNumerarioSaldoAnalitico: function(callback) {
		var myquery = 'SELECT SUM([VL_DINHEIRO] + [VL_ENVELOPE]) AS [NUMERARIO] FROM [dbo].[TB_SALDO] WHERE DT_SALDO > DATEADD(D,-1,(SELECT MAX(DT_SALDO) FROM [dbo].[TB_SALDO]))';
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemNumerarioRecolhidoAnalitico: function(dt_inicio, dt_fim, callback) {
		var myquery = 'SELECT SUM([VL_DINHEIRO] + [VL_ENVELOPE]) AS [NUMERARIO] FROM [TB_COLETA]'
		var where = [];

		if (dt_inicio != null && dt_fim != null) {
			where.push('[DT_COLETA] BETWEEN ' + dt_inicio + ' AND ' + dt_fim);
		}
		else {
			where.push('[DT_COLETA] > DATEADD(D,-1,(SELECT MAX(DT_COLETA) FROM [dbo].[TB_COLETA]))');
		}

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemTotaisDepositoPorData: function(callback) {
		var myquery = 'SELECT TOP 10 DATA, SUM(VL_DINHEIRO) AS VL_DINHEIRO, SUM(VL_CHEQUE) AS VL_CHEQUE, SUM(VL_ENVELOPE) AS VL_ENVELOPE FROM VW_DEPOSITOS_POR_DATA GROUP BY DATA ORDER BY DATA DESC;'
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemTerminaisDisponiveis: function (callback) {
		var myquery = 'SELECT TERMINAL AS [ST], COUNT(1) AS QTD FROM VW_DISPOSITIVOS GROUP BY TERMINAL;'
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemValidadoresDisponiveis: function (callback) {
		var myquery = 'SELECT VALIDADOR AS [ST], COUNT(1) AS QTD FROM VW_DISPOSITIVOS GROUP BY VALIDADOR;'
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemImpressorasDisponiveis: function (callback) {
		var myquery = 'SELECT IMPRESSORA AS [ST], COUNT(1) AS QTD FROM VW_DISPOSITIVOS GROUP BY IMPRESSORA;'
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemBiometriasDisponiveis: function (callback) {
		var myquery = 'SELECT BIOMETRIA AS [ST], COUNT(1) AS QTD FROM VW_DISPOSITIVOS GROUP BY BIOMETRIA;'
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemPortasDisponiveis: function (callback) {
		var myquery = 'SELECT PORTA AS [ST], COUNT(1) AS QTD FROM VW_DISPOSITIVOS GROUP BY PORTA;'
		new sql.Request().query(myquery).then(function(recordset) {
			return callback(recordset);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	IncluiEvento: function (nr_terminal, id_evento_local, ds_tipo_evento, ds_evento, 
	                        data_evento, cd_dispositivo, callback) {
		var cdRetorno=0, dsRetorno="";
		new sql.Request()
			.input('NR_TERMINAL', sql.VarChar(10), nr_terminal)
			.input('ID_EVENTO_LOCAL', sql.int, id_evento_local)
			.input('DS_TIPO_EVENTO', sql.VarChar(100), ds_tipo_evento)
			.input('DS_EVENTO', sql.VarChar(255), ds_evento)
			.input('DATA_EVENTO', sql.VarChar(30), data_evento)
			.input('CD_DISPOSITVO', sql.int, cd_dispositivo)
			.output('CD_RETORNO', sql.int, cdRetorno)
			.output('DS_RETORNO', sql.VarChar(100), dsRetorno)
			.execute('PS_EVENTO').then(function(recordsets) {
				return callback({'cd_retorno':cdRetorno, 'ds_detorno':DS_RETORNO});
			}).catch(function(err) {
				return callback({'cd_retorno':-1, 'ds_detorno':err});
			});
	}
	,
	AtualizaMonitoracao: function (nr_terminal, dt_sonda, st_terminal, st_validador
								 , st_impressora, st_biometria, st_porta, st_energia
								 , st_vibracao, st_porta_gabinete, st_presenca_malote
								 , st_temperatura, callback) 
	{
		var cdRetorno=0, dsRetorno="";
		console.log(		nr_terminal, dt_sonda, st_terminal, st_validador
								 , st_impressora, st_biometria, st_porta, st_energia
								 , st_vibracao, st_porta_gabinete, st_presenca_malote
								 , st_temperatura);
			// .input('ST_TERMINAL', sql.int, st_terminal)
			// .input('ST_VALIDADOR', sql.tinyint, st_validador)
			// .input('ST_IMPRESSORA', sql.tinyint, st_impressora)
			// .input('ST_BIOMETRIA', sql.tinyint, st_biometria)
			// .input('ST_PORTA', sql.tinyint, st_porta)
			// .input('ST_ENERGIA', sql.tinyint, st_energia)
			// .input('ST_VIBRACAO', sql.tinyint, st_vibracao)
			// .input('ST_PORTA_GABINETE', sql.tinyint, st_porta_gabinete)
			// .input('ST_PRESENCA_MALOTE', sql.tinyint, st_presenca_malote)
			// .input('ST_TEMPERATURA', sql.tinyint, st_temperatura)
			// .output('CD_RETORNO', sql.int, cdRetorno)
			// .output('DS_RETORNO', sql.VarChar(100), dsRetorno)
		new sql.Request()
			.input('NR_TERMINAL', sql.VarChar(10), nr_terminal)
			.input('DATA_SONDA', sql.VarChar(30), dt_sonda)
			.execute('PS_MONITORACAO').then(function(recordsets) {
				return callback({'cd_retorno':cdRetorno, 'ds_detorno':DS_RETORNO});
			}).catch(function(err) {
				return callback({'cd_retorno':-1, 'ds_detorno':JSON.stringify(err)});
			});
	}
	
};
