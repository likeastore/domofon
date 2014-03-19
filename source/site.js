var http = require('http');
var express = require('express');
var swig = require('swig');
var path = require('path');

var app = express();
var env = process.env.NODE_ENV || 'development';

app.configure(function(){
	app.set('port', process.env.PORT || 5004);
	app.engine('html', swig.renderFile);
	app.set('views', __dirname + '/../views');
	app.set('view engine', 'html');
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function() {
	app.set('view cache', false);
	swig.setDefaults({ cache: false });
	app.use(express.logger('dev'));
	app.use(express.static(path.join(__dirname, '/../public')));
	app.use(express.errorHandler());
});

app.configure('staging', function () {
	app.set('view cache', false);
	swig.setDefaults({ cache: false });
	//app.use(express.basicAuth(config.access.user, config.access.password));
	app.use(express.logger('short'));
	app.use(express.compress());
	app.use(express.static(path.join(__dirname, '/../public')));
});

app.configure('production', function() {
	app.use(express.logger('short'));
	app.use(express.compress());
	app.use(express.static(path.join(__dirname, '/../public')));
});

app.configure('test', function() {
	app.use(express.static(path.join(__dirname, '/../public')));
	app.use(express.errorHandler());
});


app.get('/', function (req, res) {
	res.render('dashboard', {title: 'Domofon dashboard', mode: env});
});

http.createServer(app).listen(app.get('port'), function (err) {
	console.log('domofon site started on port ' + app.get('port') + ' env ' + env);
});