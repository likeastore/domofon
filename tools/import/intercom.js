var _ = require('underscore');
var util = require('util');
var events = require('events');
var async = require('async');
var Intercom = require('intercom.io');
var single = require('single-line-log');
var humps = require('./humps/humps');

var config = require('../../config');
var db = require('../../source/db')(config);

var opts = {
	appId: '8aa471d88de92f2f1f1a2fc08438fc69f4d9146e',
	apiKey: '143213bd65bb237a83968bca8e14e2d0f838d692'
};

var intercom = new Intercom(opts);
var queue = async.queue(save);
var total = 0;
var stream = readIntercom();
var done = false;

stream.on('start', function () {
	console.log('starting intercom export');
});

stream.on('error', function (err) {
	handleError(err);
});

stream.on('data', function (user, total) {
	queue.push(user);
});

stream.on('end', function () {
	done = true;
});

queue.drain = function () {
	if (done) {
		console.log('all intercom users successfully exported');
		db.close();
	}
};

function readIntercom() {
	var readEmitter = new events.EventEmitter();
	var currentPage = 1;

	var requester = function () {
		intercom.getUsers({page: currentPage}, function (err, res) {
			if (err) {
				return readEmitter.emit('err', err);
			}

			res.users.forEach(function (user) {
				readEmitter.emit('data', user, res.total_count);
			});

			currentPage = res.next_page;

			if (currentPage) {
				process.nextTick(requester);
			} else {
				readEmitter.emit('end');
			}
		});

		return readEmitter;
	};

	process.nextTick(function () {
		readEmitter.emit('start');
	});

	return requester();
}

function save(user, callback) {
	var data = humps.camelizeKeys(_.omit(user, ['intercom_id', 'user_id', 'company_ids', 'vip_timestamp']));

	db.users.update(
		{email: user.email},
		data,
		{upsert: true},
		function (err) {
			handleError(err);
			total++;
			single('saved ' + total + ' users');
			callback(err);
		});
}

function handleError (err) {
	if (err) {
		util.print(util.inspect(err, { depth: 20 }));
		process.exit(1);
	}
}