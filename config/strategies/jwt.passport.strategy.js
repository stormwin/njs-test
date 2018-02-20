'use strict';

/**
 * Module dependencies.
 */
const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader('access-token'),
    secretOrKey: 'secret'
}

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                return user.authenticate(password);
            })
            .then(user => done(null, user))
            .catch(error => done(error));
    }));

    passport.use(new JwtStrategy(opts, (jwt, cb) => {
        return User.findById(jwt.id)
            .select('-password')
            .then(user => cb(null, user))
            .catch(err => cb(err));
    }));
}