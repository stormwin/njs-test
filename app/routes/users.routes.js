'use strict';

const users = require('../controlers/users/users.authentication.controller');
const users2 = require('../controlers/users/users.controller');

module.exports = (app) => {
    app.get('/me', users2.requiresLogin);
    app.post('/signin', users.signin);
    app.post('/signup', users.signup);
}