'use strict';

// Let's use ExpressJS
const express = require('express'),

    // Importing glob. We use glob for searching for files
    glob = require('glob'),

    bodyParser = require('body-parser'),

    passport = require('passport'),

    // Importing path resolver
    path = require('path');




module.exports = () => {

    // Init ExpressJS
    const app = express();

    // We want to be only JSON API. Other data formats will be rejected
    express.json();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(passport.initialize());

    app.enable('jsonp callback');

    // Set up port to 3000 and start listening
    app.listen(3000, () => {
        console.log('Yayyy, we started the server');
    })


    const models = glob('./app/models/**/*.js', {
        sync: true
    });
    const routes = glob('./app/routes/**/*.js', {
        sync: true
    });

    models.map(match => require(path.resolve(match)));
    routes.map(match => require(path.resolve(match))(app));
}