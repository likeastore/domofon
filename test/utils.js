var crypto = require('crypto');
var config = require('../config');

function baseUrl() {
	return config.applicationUrl;
}

function createApp() {
	return crypto.createHash('sha1').update(crypto.randomBytes(128)).digest('hex');
}

module.exports = {
	baseUrl: baseUrl,
	createApp: createApp
};