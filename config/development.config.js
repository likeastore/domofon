var config = {
	connection: 'mongodb://localhost:27017/domofondb',

	services: {
		logentries: {},
		mandrill: {}
	},

	applications: {
		'app': 'a603f1619f7a4b9f96bec79368584967'
	}
};

module.exports = config;