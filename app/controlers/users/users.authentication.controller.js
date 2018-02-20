'use strict';

const mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    User = require('mongoose').model('User');


exports.signin = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) {
            return res.status(500).json(err)
        }
        req.login(user, { session: false }, (err) => {
            const expireTime = Date.now() + (168 * 60 * 60 * 1000); // A week from now (168 hrs)

            // generate login token
            const tokenPayload = {
                id: user.id,
                expires: expireTime
            };

            let token = jwt.encode(tokenPayload, 'secret');
            user = user.toJSON();
            delete user.password;
            user.token = token;

            res.json(user);
        });
       
    })(req, res, console.log);
};

exports.signup = (req, res, next) => {

    const user = new User(req.body);

    user.save()
        .then(() => res.json(user))
        .catch(error => next(error))
}