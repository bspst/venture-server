global.v = {};
v.state = {};

require('./modules/db.js');

require('./modules/container.js');
require('./modules/player.js');
require('./modules/utils.js');
require('./modules/item.js');
require('./modules/ws.js');

// Initialize components if necessary
v.init = function(wss, firebase) {
	v.wss = wss;
	v.db.firebase = firebase;
};

// Outputs string to console and sends it to the DB
v.d = function(d) {
	console.log(d);
	v.db.get().ref("debug").set(d);
};

module.exports = v;
