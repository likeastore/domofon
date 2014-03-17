var crypto = require('crypto');
var config = require('../config');
var config = require('../config');
var db = require('../source/db')(config);

function baseUrl() {
	return config.applicationUrl;
}

function createApp() {
	return crypto.createHash('sha1').update(crypto.randomBytes(128)).digest('hex');
}

function updateProperty(user, prop, value, callback) {
	var set = {};
	set[prop] = value;
	db.users.update({email: user.email, app: user.app}, {$set: set}, callback);
}

module.exports = {
	baseUrl: baseUrl,
	createApp: createApp,
	updateProperty: updateProperty
};