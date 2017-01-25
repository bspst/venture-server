global.v = {};

require('./modules/utils.js');
require('./modules/ws.js');

v.init = function(wss) {
	v.wss = wss;
};

module.exports = v;
