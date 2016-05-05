var express = require('express');
var router = express.Router();
var master = require('../models/dbCofreMaster');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	next();
});

router.get('/Perfil', isLoggedIn, function(req, res) {
	master.ObtemPerfil(req.query.id, req.query.tipo, function(rs, err) {
		if (!err)
			res.send(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Cliente', isLoggedIn, function(req, res) {
	master.ObtemCliente(req.query.id, req.query.cnpj, req.query.ativo, function(rs, err) {
		if (!err)
			res.send(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Menu', isLoggedIn, function(req, res) {
	master.ObtemMenu(req.query.id, req.query.id_anterior, req.query.tipo, req.query.ativo, req.query.id_perfil, function(rs, err) {
		if (!err)
			res.send(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/MenuPerfil', isLoggedIn, function(req, res) {
	master.ObtemMenuPerfil(req.query.id_cliente, req.query.id_perfil, function(rs, err) {
		if (!err)
			res.send(rs);
		else 
			res.status(500).send(err);
	});
});

router.get('/Usuario', isLoggedIn, function(req, res) {
	master.ObtemUsuario(req.query.id, req.query.identificador, req.query.ativo, req.query.id_cliente, req.query.id_perfil, req.query.id_terminal
	, function(rs, err) {
		if (!err)
			res.send(rs);
		else 
			res.status(500).send(err);
	});
});

module.exports = router;


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	return next();
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
