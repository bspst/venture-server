global.v = {};
v.state = {};

require("./modules/db.js");

require("./modules/container.js");
require("./modules/player.js");
require("./modules/utils.js");
require("./modules/auth.js");
require("./modules/item.js");
require("./modules/ws.js");

// Initialize components if necessary
v.init = function(wss, firebase) {
	v.wss = wss;
	v.wss.on("connection", v.ws.connection);
	v.db.firebase = firebase;
};

// Outputs string to console and sends it to the DB
v.d = function(d) {
	if(process.env.debug == "1") {
		console.log("[" + new Date().toLocaleString() + " D] " + d);
		v.db.get().ref("debug").set(d);
	}
};

// Normal logging
v.l = function(d) {
	console.log("[" + new Date().toLocaleString() + " L] " + d);
	v.db.get().ref("debug").set(d);
}

module.exports = v;
