var http = require('http');
var express = require('express');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 5004);
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

http.createServer(app).listen(app.get('port'), function (err) {
	var env = process.env.NODE_ENV || 'development';
	console.log('domofon site started on port ' + app.get('port') + ' env ' + env);
});