'use strict';

module.exports = (app) => {

    app.get('/me');
    app.get('/logout')
    app.post('/login');
    app.post('/register');
}