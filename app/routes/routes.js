
module.exports = function(app, passport) {
    app.get('/', function(req, res) {
		if (req.isAuthenticated())
			res.redirect('/geral');
		else
			res.redirect('/login');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.get('/profile', function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });
	
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	//Other routes =====================================================
	app.use('/reports', require('./reportsRouter'));
	// app.use('/controllers', require('./controllersRouter'));
	app.use('/model/master', require('./masterModelRouter'));
	app.use('/model/cliente', require('./clienteModelRouter'));

	//TODO - Separar estas rotas...
	//MONITORAMENTO
	app.get('/monitoramento', isLoggedIn, function(req, res) {
        res.render('monitoramento/monitoramento.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

	app.get('/monitoramento/detalhe', isLoggedIn, function(req, res) {
        res.render('monitoramento/detalhe.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

app.get('/geral', isLoggedIn, function(req, res) {
        res.render('monitoramento/geral.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}