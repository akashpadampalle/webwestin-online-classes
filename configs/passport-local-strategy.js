const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async function (email, password, done) {

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false);
            }

            const doesPasswordMatch = await bcrypt.compare(password, user.password);

            if(!doesPasswordMatch){
                return done(null, false);
            }


            done(null, user);
        } catch (error) {
            console.log(`error in passport authentication ${error}`);
            return done(error, false);
        }
    }
));

// serializing user to decide which key is to kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser( async function(id, done){
    const user = await User.findById(id).select('-password');

    if(!user){
        return done(null, false);
    }

    return done(null, user);
});


// check if user in authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user 
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;

module.exports = passport;