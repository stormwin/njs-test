'use strict';

// Let's use ExpressJS
const express = require('express'),

    // Importing glob. We use glob for searching for files
    glob = require('glob'),

    // Importing path resolver
    path = require('path');




module.exports = () => {

    // Init ExpressJS
    const app = express();

    // We want to be only JSON API. Other data formats will be rejected
    express.json();

    // Set up port to 3000 and start listening
    app.listen(3000, () => {
        console.log('Yayyy, we started the server');
    })


    glob('./app/models/**/*.js', (err, matches) => {

        // First, we are checking for any errors.
        if (err) {
            console.log('Upppsss, cannot find any model :(')
            console.error(error);
            return;
        }

        // Resolve module
        matches.map(match => require(match));
    });

    glob('./app/routes/**/*.js', (err, matches) => {

        // First, we are checking for any errors.
        if (err) {
            console.log('Upppsss, cannot find any routes :(')
            console.error(error);
            return;
        }

        // Resolve module
        matches.map(match => require(match(app)));
    });
}