/**
 * Project Venture Server
 * Copyright (c) 2017 Hizkia Felix
 */
global.v = {};
v.initialized = false;
v.state = {};
v.state.cache = {};

require("./modules/db.js");

require("./modules/container.js");
require("./modules/player.js");
require("./modules/utils.js");
require("./modules/auth.js");
require("./modules/item.js");
require("./modules/ws.js");

// Initialize components if necessary
v.init = function(firebase) {
	v.db.firebase = firebase;

	// Cache entire DB to memory (probably not a good idea, but meh.)
	// 10k players = ~16gb RAM (rough estimate)
	v.db.get().ref("/").once("value").then(function(ds) {
		v.state.cache = ds.val();
		v.initialized = true;
		v.l("Done caching database");

		// Start WS Server
		v.wss = new require("ws").Server({ port: (process.env.PORT || 5000) });
		v.wss.on("connection", v.ws.connection);

		// Start DB pushes
		v.db.push();
	});
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
