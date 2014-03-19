var http = require('http');
var express = require('express');
var swig = require('swig');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 5004);
	app.engine('html', swig.renderFile);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.get('/', function (req, res) {
	res.render('dashboard');
});

http.createServer(app).listen(app.get('port'), function (err) {
	var env = process.env.NODE_ENV || 'development';
	console.log('domofon site started on port ' + app.get('port') + ' env ' + env);
});