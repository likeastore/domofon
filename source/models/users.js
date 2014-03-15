var config = require('../../config');
var db = require('../db')(config);
var async = require('async');

var queue = async.queue(function (user, callback) {
	db.users.findOne({email: user.email}, function (err, foundUser) {
		if (err) {
			return callback(err);
		}

		operation(user, foundUser).execute(callback);
	});
});

function operation(user, foundUser) {
	return foundUser ? updateProperties(user, foundUser) : createNew(user);
}

function updateProperties(user, updatedUser) {
	return {
		execute: function (callback) {

		}
	};
}

function createNew(user) {
	return {
		execute: function (callback) {

		}
	};
}

function find (query, callback) {

}

function save (user, callback) {
	queue.push(user);
	process.nextTick(callback);
}

module.export = {
	find: find,
	save: save
};
