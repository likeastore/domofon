var respawn = require('respawn');
var util = require('util');
var logger = require('./source/utils/logger');

function monitor(a, p) {
	var proc = respawn(p, {
		cwd: '.',
		maxRestarts: 10,
		sleep: 1000,
	});

	proc.on('spawn', function () {
		util.puts(a + ' monitor started');
	});

	proc.on('exit', function (code, signal) {
		logger.fatal({app: a, msg: 'process exited, code: ' + code + ' signal: ' + signal});
	});

	proc.on('stdout', function (data) {
		util.puts(data.toString());
	});

	proc.on('stderr', function (data) {
		logger.error({app: a, msg: 'process error', data: data.toString()});
	});

	return proc;
}

[monitor('api', ['node', 'source/api.js']), monitor('site', ['node', 'source/site.js'])].forEach(function (m) {
	m.start();
});

