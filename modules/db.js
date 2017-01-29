/**
 * Db - handles connections to firebase DB
 */
v.db = {};
v.db.firebase = null;
v.db.lastPush = new Date().getTime();
v.db.pushInterval = 5 * 60000; // 5 minutes

// Gets the server's database
// Returns a Firebase database object
v.db.get = function() {
	return v.db.firebase.database();
};

// Push local changes to Firebase
v.db.push = function() {
	v.l("Pushing local changes...");
	v.db.get().ref("/").set(v.state.cache, function() {
		v.l("Push complete!");

		var diff = new Date().getTime() - v.db.lastPush;
		if(diff > v.db.pushInterval)
			v.db.push();
		else
			setTimeout(v.db.push, v.db.pushInterval - diff);
	});
};

// Force push
v.db.pushf = function() {
	v.db.get().ref("/").set(v.state.cache);
};
