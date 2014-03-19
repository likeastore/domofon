var $ = require('jquery');
var MainView = require('./views/main');

var app = {
	run: function () {
		var view = new MainView();
		$('.app').html(view.render().el);
	}
};

module.exports = app;