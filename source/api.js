var http = require('http');
var express = require('express');
var package = require('../package');
var secure = require('./middleware/secure');
var cors = require('./middleware/cors');
var users = require('./queues/users');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 5005);
	app.use(express.bodyParser());
	app.use(cors);
	app.use(express.methodOverride());
	app.use(app.router);
});

// Healthcheck
app.get('/', function (req, res) {
	res.json({app: 'domofon', env: process.env.NODE_ENV, version: package.version, apiUrl: '/api'});
});

app.get('/api/users', function (req, res, next) {
	users.find(req.query, function (err, users) {
		if (err) {
			return next(err);
		}

		res.json(users);
	});
});

app.post('/api/users', function (req, res, next) {
	users.save(req.body, function (err) {
		if (err) {
			return next(err);
		}

		res.send(201);
	});
});

http.createServer(secure(app)).listen(app.get('port'), function (err) {
	var env = process.env.NODE_ENV || 'development';
	console.log('domofon server started on port ' + app.get('port') + ' env ' + env);
});