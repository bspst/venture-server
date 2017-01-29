/**
 * Utils - various tools and utilities
 */
var crypto = require("crypto");
v.utils = {};

// Generates a random GUID
// Returns a string GUID
v.utils.makeGUID = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
		s4() + "-" + s4() + s4() + s4();
};

// Calculates the distance between two {x, y, z} formatted coordinates
// Returns a float
v.utils.distance = function(a, b) {
	v.d("Calculating distance between A and B");
	v.d(utils.inspect(a));
	v.d(utils.inspect(b));
	var d = Math.sqrt(
		Math.pow(a[x] - b[x], 2) +
		Math.pow(a[y] - b[y], 2) +
		Math.pow(a[z] - b[z], 2)
	);
	v.d("It's " + d);
	return d;
};

// Calculates the hashes of a string
// Returns a hex-digested string
v.utils.hash = function(algo, val) {
	return crypto.createHash(algo).update(val).digest("hex");
};
