global.v = {};
v.state = {};

require('./modules/firebase.js');
require('./modules/utils.js');
require('./modules/ws.js');

v.init = function(wss, firebase) {
	v.wss = wss;
	v.firebase.connection = firebase;
};

module.exports = v;
