/**
 * Utils - various tools and utilities
 */
v.utils = {};

// Generates a random GUID
// Returns a string GUID
v.utils.makeGUID = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
};

// Calculates the distance between two {x, y, z} formatted coordinates
// Returns a float
v.utils.distance = function(a, b) {
	return Math.sqrt(
		Math.pow(a[x] - b[x], 2) +
		Math.pow(a[y] - b[y], 2) +
		Math.pow(a[z] - b[z], 2)
	);
}
