'use strict';

const mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    User = require('mongoose').model('User');


exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return res.status(500).json(err)
        }
        req.login(user, (err) => {
            const expireTime = Date.now() + (168 * 60 * 60 * 1000); // A week from now (168 hrs)

            // generate login token
            const tokenPayload = {
                user: user.id,
                expires: expireTime
            };

            let token = jwt.encode(tokenPayload, 'secret');
            user = user.toJSON();
            user.token = token;

            res.json(user);
        });
       
    })(req, console.log, console.log);
};

exports.signup = (req, res, next) => {

    const user = new User(req.body);

    user.save()
        .then(() => res.json(user))
        .catch(error => next(error))
}