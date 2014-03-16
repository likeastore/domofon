var async = require('async');
var moment = require('moment');
var crypto = require('crypto');
var config = require('../config');
var db = require('../source/db')(config);

function createApp() {
	return crypto.createHash('sha1').update(crypto.randomBytes(128)).digest('hex');
}


module.exports = {
	createApp: createApp
};