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

			describe('and get user', function () {
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
					console.log(results.data);
					expect(results.data).to.have.length(1);
				});
			});
		});

		describe('when user updated', function () {
			it('should be updated', function () {

			});

			it('should have update lastImpressionAt', function () {

			});

			it('should have session count as one', function () {

			});

			describe('after half of hour', function () {
				beforeEach(function () {
					// hack lastImpressionAt in db
				});

				it('should session incremented', function () {

				});
			});
		});
	});

	describe('when getting users', function () {
		describe('if empty', function () {

		});

		describe('if for one page', function () {

		});

		describe('if for two pages', function () {

		});
	});
});