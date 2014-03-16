var moment = require('moment');
var config = require('../../config');
var db = require('../db')(config);

var pageSize = 50;

function find (q, callback) {
	var query = db.users.find({ app: q.app }).limit(pageSize);
	if (q.page) {
		query = query.skip(pageSize * (+q.page - 1));
	}

	query.sort({lastImpressionAt: -1} , returnResults);

	function returnResults(err, items) {
		if (err) {
			return callback(err);
		}

		callback(null, {data: items, nextPage: items.length === pageSize});
	}
}

function operation(user, foundUser, options) {
	return foundUser ? updateProperties(user, foundUser, options) : createNew(user, options);
}

function updateProperties(user, updatedUser) {
	return {
		execute: function (callback) {
			user.lastImpressionAt = moment().utc().valueOf();

			db.users.update({email: user.email}, {$set: updatedUser, $inc: {sessionCount: 1}});
		}
	};
}

function createNew(user) {
	return {
		execute: function (callback) {
			user.sessionCount = 1;
			user.lastImpressionAt = moment().utc().valueOf();

			db.users.save(user, callback);
		}
	};
}

function save (user, options, callback) {
	db.users.findOne({email: user.email}, function (err, foundUser) {
		if (err) {
			return callback(err);
		}

		operation(user, foundUser, options).execute(callback);
	});
}

module.export = {
	find: find,
	save: save
};
