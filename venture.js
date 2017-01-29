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
v.init = function(wss, firebase) {
	v.wss = wss;
	v.wss.on("connection", v.ws.connection);
	v.db.firebase = firebase;

	// Cache entire DB to memory (probably not a good idea, but meh.)
	v.db.get().once("value").then(function(ds) {
		v.state.cache = ds.val();
		v.initialized = true;
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
