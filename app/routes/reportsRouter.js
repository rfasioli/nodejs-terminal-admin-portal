var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	next();
});

router.get('/depositos', isLoggedIn, function(req, res) {
	res.render('reports/depositos.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});

router.get('/fechamento', isLoggedIn, function(req, res) {
	res.render('reports/fechamento.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});

router.get('/usuario_cofre', isLoggedIn, function(req, res) {
	res.render('reports/usuario_cofre.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});

router.get('/numerario', isLoggedIn, function(req, res) {
	res.render('reports/numerario.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});

router.get('/movimento_cofre', isLoggedIn, function(req, res) {
	res.render('reports/movimento_cofre.ejs', {
		user : req.user // get the user out of session and pass to template
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
