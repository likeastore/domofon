var request = require('request');
var testUtils = require('../utils');
var moment = require('moment');

describe('users.spec.js', function () {
	var url, app, payload, error, response, results;

	beforeEach(function () {
		url = testUtils.baseUrl() + '/api/users';
	});

	beforeEach(function () {
		app = testUtils.createApp();
	});

	describe('when creating users', function () {
		describe('when user created', function () {
			beforeEach(function () {
				payload = {app: app, email: 'test@email.com', createdAt: moment().valueOf() };
			});

			beforeEach(function (done) {
				request.post({url: url, body: payload, json: true}, function (err, resp, body) {
					error = err;
					response = resp;
					results = body;
					done(err, body);
				});
			});

			it ('should respond 201 (created)', function () {
				expect(response.statusCode).to.equal(201);
			});

			describe('check user properites', function () {
				beforeEach(function (done) {
					request.get({url: url + '?app=' + app, json: true}, function (err, resp, body) {
						error = err;
						response = resp;
						results = body;
						done(err, body);
					});
				});

				it('should respond 200 (ok)', function () {
					expect(response.statusCode).to.equal(200);
				});

				it('should have 1 user', function () {
					expect(results.data).to.have.length(1);
				});
			});
		});

		describe('when user updated', function () {
			var user;

			beforeEach(function () {
				payload = {app: app, email: 'test@email.com', createdAt: moment().valueOf() };
			});

			beforeEach(function (done) {
				request.post({url: url, body: payload, json: true}, function (err, resp, body) {
					error = err;
					response = resp;
					results = body;
					done(err, body);
				});
			});

			beforeEach(function (done) {
				request.get({url: url + '?app=' + app, json: true}, function (err, resp, body) {
					error = err;
					response = resp;
					results = body;
					user = results.data[0];
					done(err, body);
				});
			});

			beforeEach(function (done) {
				request.post({url: url, body: payload, json: true}, function (err, resp, body) {
					error = err;
					response = resp;
					results = body;
					done(err, body);
				});
			});

			it('should respond 201 (ok)', function () {
				expect(response.statusCode).to.equal(201);
			});


			describe('check user properites', function () {
				var updatedUser;

				beforeEach(function (done) {
					request.get({url: url + '?app=' + app, json: true}, function (err, resp, body) {
						error = err;
						response = resp;
						results = body;
						updatedUser = results.data[0];
						done(err, body);
					});
				});

				it('should have update lastImpressionAt', function () {
					expect(updatedUser.lastImpressionAt).to.be.greaterThan(user.lastImpressionAt);
				});

				it('should have session count as one', function () {
					expect(updatedUser.sessionCount).to.equal(1);
				});
			});

			describe('after half of hour', function () {
				var updatedUser;

				beforeEach(function (done) {
					testUtils.updateProperty(user, 'lastImpressionAt', user.lastImpressionAt - 30 * 60 * 1000, done);
				});

				beforeEach(function (done) {
					request.post({url: url, body: payload, json: true}, function (err, resp, body) {
						error = err;
						response = resp;
						results = body;
						done(err, body);
					});
				});

				beforeEach(function (done) {
					request.get({url: url + '?app=' + app, json: true}, function (err, resp, body) {
						error = err;
						response = resp;
						results = body;
						updatedUser = results.data[0];
						done(err, body);
					});
				});

				it('should have update lastImpressionAt', function () {
					expect(updatedUser.lastImpressionAt).to.be.greaterThan(user.lastImpressionAt);
				});

				it('should session be incremented', function () {
					expect(updatedUser.sessionCount).to.equal(2);
				});
			});
		});
	});
});