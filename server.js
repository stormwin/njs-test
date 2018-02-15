'use strict'

// Start HTTP server
require('./config/http.config')();

// Start Database
require('./config/mongodb.config')();