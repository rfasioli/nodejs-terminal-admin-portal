var express = require('express');
var router = express.Router();
var cliente = require(__dirname + '/../models/dbCofreCliente');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	next();
});

router.get('/Monitoramento', isLoggedIn, function(req, res) {
	cliente.ObtemEstadoMonitoramento(req.query.id, req.query.id_terminal, req.query.nr_terminal, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/MonitoramentoAnalitico', isLoggedIn, function(req, res) {
	cliente.ObtemEstadoMonitoramentoAnalitico(function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.post('/Monitoramento', isLoggedIn, function(req, res) {
	//Incluir Cliente
        // // create a todo, information comes from AJAX request from Angular
        // Todo.create({
            // text : req.body.text,
            // done : false
        // }, function(err, todo) {
            // if (err)
                // res.send(err);

});

router.get('/Eventos', isLoggedIn, function(req, res) {
	cliente.ObtemEventos(req.query.id, req.query.id_local, req.query.tp_evento, req.query.id_terminal, req.query.nr_terminal, req.query.cd_dispositivo, req.query.dt_inicio, req.query.dt_fim, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/ConsultaEventos', isLoggedIn, function(req, res) {
	cliente.ConsultaEventos(req.query.nr_terminal, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Estabelecimentos', isLoggedIn, function(req, res) {
	cliente.ObtemEstabelecimentos(req.query.id, req.query.id_fornecedor, req.query.id_regiao, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Depositos', isLoggedIn, function(req, res) {
	cliente.ObtemDepositos(req.query.id, req.query.id_local, req.query.id_terminal, req.query.nr_terminal, req.query.nr_malote, req.query.nr_envelope, req.query.id_identificador, req.query.dt_inicio, req.query.dt_fim, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Coletas', isLoggedIn, function(req, res) {
	cliente.ObtemColetas(req.query.id, req.query.id_local, req.query.id_terminal, req.query.nr_terminal, req.query.nr_malote, req.query.id_identificador, req.query.dt_inicio, req.query.dt_fim, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Terminais', isLoggedIn, function(req, res) {
	cliente.ObtemTerminais(req.query.id_terminal, req.query.nr_terminal, req.query.id_estabelecimento, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Numerario', isLoggedIn, function(req, res) {
	cliente.ObtemNumerario(req.query.terminais, function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/UsuarioCofre', isLoggedIn, function(req, res) {
	cliente.ObtemUsuarioCofre(req.query.terminais
							, req.query.identificador
							, req.query.usuario
							, req.query.biometria
							, function(rs, err) 
	{
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/MovimentoCofre', isLoggedIn, function(req, res) {
	cliente.ObtemMovimentoCofre(req.query.terminais
							  , req.query.identificador
							  , req.query.dt_inicial
							  , req.query.dt_final
							  , function(rs, err) 
	{
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/NumerarioSaldoAnalitico', isLoggedIn, function(req, res) {
	cliente.ObtemNumerarioSaldoAnalitico(function(rs, err) {
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/NumerarioRecolhidoAnalitico', isLoggedIn, function(req, res) {
	cliente.ObtemNumerarioRecolhidoAnalitico(req.query.dt_inicial
										   , req.query.dt_final
										   , function(rs, err) 
	{
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/TotaisDeposito', isLoggedIn, function(req, res) {
	cliente.ObtemTotaisDepositoPorData(function(rs, err) 
	{
		if (!err)
			res.json(rs);
		else 
			res.status(500).send(err);
	});
});


module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
