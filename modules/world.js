/**
 * World - Handles world generation
 */
v.world = {};

var Alea = require('alea');
var Simplex = require('perlin-simplex');

// Generates a chunk
// Returns a 2D array of floats (-1 to 1)
v.world.generateChunk = function(x, y) {
	var prng = new Alea(312564);
	var simplex = new Simplex({ random: function () { return prng() } });
	var matrix = [];
	var scale = 24;
	for (var nx = 0; nx < 256; nx++) {
		var col = [];
		for (var ny = 0; ny < 256; ny++) {
			var next = Math.abs(simplex.noise(((y * 64) + nx) / scale, ((x * 64) + ny) / scale));
			next += Math.abs(simplex.noise(((y * 64) + nx) / scale / 10, ((x * 64) + ny) / scale / 10));
			next = 1 - next;
			col.push(next);
		}
		matrix.push(col);
	}
	return matrix;
}
