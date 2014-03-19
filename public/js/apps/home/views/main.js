/** @jsx React.DOM */
var Backbone = require('Backbone');
var React = require('React');

var component = React.createClass({
	render: function () {
		return <div>Hello World</div>;
	}
});

var MainView = Backbone.View.extend({
	render: function () {
		React.renderComponent(<component/>, this.el);
		return this;
	}
});

module.exports = MainView;