'use strict';

// Import mongoose lib
const mongoose = require('mongoose');


module.exports = () => {
	// Connecting and authenticating with database
	mongoose.connect('mongodb://test:test@ds235328.mlab.com:35328/nodejstest')
			.then(data => {
				console.log('We have a connection with MongoDB');
			})
			.catch(error => {
				console.error('Houston, we got a database problem');
				console.error(error);
			});

}
