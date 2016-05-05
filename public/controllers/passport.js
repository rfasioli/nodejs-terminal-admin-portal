// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var master          = require('../../app/models/dbCofreMaster');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.ID_USUARIO);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user_id, done) {
		master.ObtemUsuarioPerfil(user_id, null, null, function(user, err) {
			var obj = { 
						id      : user[0].ID_USUARIO
					  , login   : user[0].DS_LOGIN
					  , name    : user[0].NM_USUARIO
					  , profile : { 
						  id         : user[0].ID_PERFIL 
						, description: user[0].DS_PERFIL 
						} 
					  };
			done(err, obj);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
/*	
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with identificador
        usernameField : 'identificador',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, identificador, password, done) {
        process.nextTick(function() {
			User.findOne({ 'local.identificador' :  identificador }, function(err, user) {
				if (err) return done(err);
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That identificador is already taken.'));
				} else {
					var newUser            = new User();
					newUser.local.identificador    = identificador;
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function(err) {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}

			});    
        });
    }));
*/

	// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'identificador',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, identificador, password, done) { 
		master.ObtemUsuario(null, identificador, null, null, null, null, function(user, err) {
			if (err) return done(err);
            if (!user || !user[0])
                return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'));
			if (user[0].IC_ATIVO == 0)
                return done(null, false, req.flash('loginMessage', 'Usuário inativo.'));				
            if (user[0].DS_SENHA != password)
                return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
            return done(null, user[0]);
		});
    }));
};

