var Backbone = require('backbone');
var jquery = require('jquery');
Backbone.$ = jquery;

var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	},

	home: function () {
		require('./apps/home').run();
	}
});

var router = {
	init: function () {
		var instance = new Router();
		Backbone.history.start({pushState: true});

		return instance;
	}
};

module.exports = router;