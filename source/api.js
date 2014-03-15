var http = require('http');
var express = require('express');
// var logger = require('./utils/logger');
// var moment = require('moment');
// var db = require('./db')(config);
var package = require('../package');
var secure = require('./middleware/secure');
var cors = require('./middleware/cors');

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

http.createServer(secure(app)).listen(app.get('port'), function (err) {
	var env = process.env.NODE_ENV || 'development';
	console.log('domofon server started on port ' + app.get('port') + ' env ' + env);
});