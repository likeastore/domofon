var router = require('./router');
var client = require('./client');

client.init(window, {root: '/'});
router.init();