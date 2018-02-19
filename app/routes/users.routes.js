'use strict';

const users = require('../controlers/users/users.authentication.controller');

module.exports = (app) => {
    app.get('/me');
    app.get('/logout')
    app.post('/signin', users.signin);
    app.post('/signup', users.signup);
}