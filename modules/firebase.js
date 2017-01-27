/**
 * Firebase - handles connections to firebase DB
 */
v.firebase = {};
v.firebase.connection = null;

v.firebase.db = {};

// Gets the server's database
// Returns a Firebase database object
v.firebase.db.getDB = function() {
	return v.firebase.connection.database();
}
