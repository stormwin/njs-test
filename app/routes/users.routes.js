'use strict';

const users = require('../controlers/users/users.authentication.controller');
console.log('test');
module.exports = (app) => {
    console.log('test');
    app.get('/me');
    app.get('/logout')
    app.post('/signin');
    app.post('/signup', users.signup);
}