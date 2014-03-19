/** @jsx React.DOM */
var Backbone = require('Backbone');
var React = require('React');

var component = React.createClass({
	render: function () {
		return (
			<div>Hello {name}</div>
		);
	}
});

var MainView = Backbone.View.extend({
	render: function () {
		React.renderComponent(<component name="world"/>, this.el);
		return this;
	}
});

module.exports = MainView;