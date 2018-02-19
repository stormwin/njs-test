'use strict';

const passport = require('passport'),
    path = require('path'),
    glob = require('glob'),
    User = require('mongoose').model('User'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader('access-token'),
    secretOrKey: 'secret'
}

module.exports = () => {

    passport.use(new JwtStrategy(opts, (jwt, done) => {
        console.log(jwt);
        done();
    }));

    // Serialize sessions
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize sessions
    passport.deserializeUser((id, done) => {
        User.findOne({
            _id: id
        }).exec((err, user) => done(err, user));
    });

    const strategies = glob('./config/strategies/**/*.js', {
        sync: true
    });

    strategies.map(match => require(path.resolve(match))());
};