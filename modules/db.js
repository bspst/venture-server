/**
 * Db - handles connections to firebase DB
 */
v.db = {};
v.db.firebase = null;

// Gets the server's database
// Returns a Firebase database object
v.db.get = function() {
	return v.db.firebase.database();
};
