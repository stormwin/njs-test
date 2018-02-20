'use strict';

const users = require('../controlers/users/users.authentication.controller');
const users2 = require('../controlers/users/users.controller');
const passport = require('passport');

module.exports = (app) => {
    app.get('/me', passport.authenticate('jwt', { session: false }), users2.me);
    app.get('/getAllUsers', passport.authenticate('jwt', { session: false }), users2.getAllUsers);
    app.post('/signin', users.signin);
    app.post('/signup', users.signup);
}