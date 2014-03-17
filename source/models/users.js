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
	return foundUser ? updateProperties(foundUser, user, options) : createNew(user, options);
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

function updateProperties(foundUser, user) {
	return {
		execute: function (callback) {
			user.lastImpressionAt = moment().utc().valueOf();
			var sessionIncrement = user.lastImpressionAt - foundUser.lastImpressionAt >= 30 * 60 * 1000 ? 1 : 0;
			db.users.update({email: foundUser.email, app: foundUser.app}, {$set: user, $inc: {sessionCount: sessionIncrement}}, callback);
		}
	};
}

function save (user, options, callback) {
	db.users.findOne({email: user.email, app: user.app}, function (err, foundUser) {
		if (err) {
			return callback(err);
		}

		operation(user, foundUser, options).execute(callback);
	});
}

module.exports = {
	find: find,
	save: save
};