var mongo = require('mongojs');

module.exports = function (config) {
	var connection = config.connection || 'mongodb://localhost:27017/domofondb';
	var db = mongo.connect(connection, ['users']);
	if (!db) {
		throw new Error('could not connect to ' + connection);
	}

	return db;
};