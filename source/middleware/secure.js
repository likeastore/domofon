var _ = require('underscore');

function secure (app) {
	function checkApp() {
		// FIXME: try config and check if app id exists
		return true;
	}

	function authenticatedAccess () {
		return function (req, res, next) {
			var token = req.query.app;

			checkApp(token) ? next() : res.send(401);
		};
	}

	function applyAuthentication(app, routesToSecure) {
		for (var verb in app.routes) {
			var routes = app.routes[verb];
			routes.forEach(patchRoute);
		}

		function patchRoute (route) {
			var apply = _.any(routesToSecure, function (r) {
				return route.path.indexOf(r) === 0;
			});

			var guestAccess = _.any(route.callbacks, function (r) {
				return r.name === '_guest';
			});

			if (apply && !guestAccess) {
				route.callbacks.splice(0, 0, authenticatedAccess());
			}
		}
	}

	applyAuthentication(app, ['/api']);

	return app;
}

module.exports = secure;