'use strict';

const path = require('path'),
    glob = require('glob');

module.exports = () => {

    // Get all strategies and load them
    const strategies = glob('./config/strategies/**/*.js', {
        sync: true
    });

    strategies.forEach(match => require(path.resolve(match))());
};