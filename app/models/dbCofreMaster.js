var sql = require('mssql');
var config = require('config');

sql.connect(config.get('Connections.DbCofreMaster')).then(function() {
		console.log("dbCofreMaster.js :: Conectou!");
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

	ObtemPerfil: function(id, tipo, callback) {
		var myquery = 'SELECT * FROM [TB_PERFIL] AS [PER]';
		var where = [];

		if (id  != null) 
			where.push('[PER].[ID_PERFIL] = ' + id);
		if (tipo != null)
			where.push('[PER].[TP_PERFIL] = \'' + tipo + '\'');

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			callback(recordset);
		}).catch(function(err) {
			callback(null, err);
		});
	}
	,
	ObtemCliente: function(id, cnpj, ativo, callback) {
		var myquery = 'SELECT * FROM [TB_CLIENTE] AS [CLI]';
		var where = [];

		if (id  != null) 
			where.push('[CLI].[ID_CLIENTE] = ' + id);
		if (cnpj != null)
			where.push('[CLI].[DS_CNPJ] = \'' + cnpj + '\'');
		if (ativo != null)
			where.push('[CLI].[IC_ATIVO] = \'' + ativo + '\'');

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			callback(recordset);
		}).catch(function(err) {
			callback(null, err);
		});
	}
	,
	ObtemMenu: function(id, id_anterior, tipo, ativo, id_perfil, callback) {
		var myquery = 'SELECT * FROM [TB_MENU] AS [MNU]';
		var where = [];

		if (id_perfil != null) {
			myquery += ' INNER JOIN [TB_MENU_PERFIL] AS [MNP] ON [MNU].[ID_ITEM] = [MNP].[ID_ITEM]'
			where.push('[MNP].[ID_PERFIL] = ' + id_perfil);
		}
			
		if (id  != null) 
			where.push('[MNU].[ID_ITEM] = ' + id);
		if (id_anterior  != null) 
			where.push('[MNU].[ID_ITEM_ANTERIOR] = ' + id_anterior);
		if (tipo != null)
			where.push('[MNU].[TP_SISTEMA] = \'' + tipo + '\'');
		if (ativo != null)
			where.push('[MNU].[IC_ATIVO] = \'' + ativo + '\'');		

		myquery += montaClausula(where);
		console.log(myquery);

		new sql.Request().query(myquery).then(function(recordset) {
			callback(recordset);
		}).catch(function(err) {
			callback(null, err);
		});
	}
	,
	ObtemMenuPerfil: function(id_cliente, id_perfil, callback) {
		var request = new sql.Request();
		
		if (typeof id_perfil !== 'undefined' && id_perfil)
			request.input('ID_PERFIL', sql.VarChar, id_perfil);
		if (typeof id_cliente !== 'undefined' && id_cliente)
			request.input('ID_CLIENTE', sql.VarChar, id_cliente);
		
		request.execute('[DB_Cofre_Master].[dbo].PW_CONSULTA_PERFIL_FUNCIONALIDADE').then(function(recordsets) {
			return callback(recordsets);
		}).catch(function(err) {
			return callback(null, err);
		});
	}
	,
	ObtemUsuario: function(id, identificador, ativo, id_cliente, id_perfil, id_terminal, callback) {
		var myquery = 'SELECT * FROM [DB_Cofre_Master].[dbo].[TB_USUARIO] as [USU]';
		var where = [];

		if (id_cliente != null) {
			myquery += ' INNER JOIN [TB_USUARIO_CLIENTE] AS [USC] ON [USU].[ID_USUARIO] = [USC].[ID_USUARIO]'
			where.push('[USC].[ID_CLIENTE] = ' + id_cliente);
		}
		if (id_perfil != null) {
			myquery += ' INNER JOIN [TB_USUARIO_PERFIL] AS [USP] ON [USU].[ID_USUARIO] = [USP].[ID_USUARIO]'
			where.push('[USP].[ID_PERFIL] = ' + id_perfil);
		}
		if (id_terminal != null) {
			myquery += ' INNER JOIN [TB_USUARIO_TERMINAL] AS [UST] ON [USU].[ID_USUARIO] = [UST].[ID_USUARIO]'
			where.push('[UST].[NR_TERMINAL] = ' + id_terminal);
		}
		
		if (id  != null) 
			where.push('[USU].[ID_USUARIO] = ' + id);
		if (identificador != null)
			where.push('[USU].[DS_LOGIN] = \'' + identificador + '\'');
		if (ativo != null)
			where.push('[USU].[IC_ATIVO] = \'' + ativo + '\'');

		myquery += montaClausula(where);
		
		new sql.Request().query(myquery).then(function(recordset) {
			callback(recordset);
		}).catch(function(err) {
			callback(null, err);
		});
	}
	,
	ObtemUsuarioPerfil: function(id, identificador, ativo, callback) {
		var myquery = 'SELECT [USU].[ID_USUARIO], [USU].[DS_LOGIN],[USU].[NM_USUARIO],[USU].[DT_ALTERACAO],[USU].[DT_CRIACAO],[USU].[IC_ATIVO],[PER].[ID_PERFIL] ,[PER].[DS_PERFIL],[PER].[TP_PERFIL],[PER].[IC_NIVEL] FROM [DB_Cofre_Master].[dbo].TB_USUARIO AS [USU] LEFT OUTER JOIN [DB_Cofre_Master].[dbo].[TB_USUARIO_PERFIL] AS [USP] ON [USP].[ID_USUARIO] = [USU].[ID_USUARIO] LEFT OUTER JOIN [DB_Cofre_Master].[dbo].[TB_PERFIL] AS [PER] ON [PER].[ID_PERFIL] = [USP].ID_PERFIL';
		var where = [];

		if (id  != null) 
			where.push('[USU].[ID_USUARIO] = ' + id);
		if (identificador != null)
			where.push('[USU].[DS_LOGIN] = \'' + identificador + '\'');
		if (ativo != null)
			where.push('[USU].[IC_ATIVO] = \'' + ativo + '\'');

		myquery += montaClausula(where);

		new sql.Request().query(myquery).then(function(recordset) {
			callback(recordset);
		}).catch(function(err) {
			callback(null, err);
		});
	}
	
};
