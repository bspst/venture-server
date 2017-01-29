/**
 * Player - player functions
 */
v.player = {};

// Gets a value from the player's data
// Returns an object
v.player.getValue = function(guid, key) {
	return v.state.cache.players[guid][key];
}

// Fetches the player's name
// Returns a string
v.player.getName = function(guid) {
	return v.player.getValue(guid, "name");
}

// Fetches the character model of a player
// Returns the name of the model on success, false on failure.
v.player.getModel = function(guid) {
	return v.state.cache.players[guid].model;
};

// Sets the character model of a player
// Returns true on success, false on failure.
v.player.setModel = function(guid, modelName) {
	
};

v.player.inventory = {};

// Gets the container GUID of a player
// Returns a container GUID on success, false on failure.
v.player.inventory.getContainerGUID = function(guid, callback) {
	v.player.getValue(guid, "inventory", callback);
};

// Sets the container GUID of a player
// Returns true on success, false on failure.
v.player.inventory.setContainerGUID = function(guid, containerGUID) {
	
};

v.player.control = {};

// Gets the coordinates of a player
// Returns a JSON object containing "x", "y", "z", "a" (yaw), and "b" (pitch).
v.player.control.getPos = function(guid, callback) {
	v.db.get().ref("players").child(guid).once("value").then(function(ds) {
		var pos = {};
		pos.x = ds.child("loc/x").val();
		pos.y = ds.child("loc/y").val();
		pos.z = ds.child("loc/z").val();
		pos.a = ds.child("loc/a").val();
		pos.b = ds.child("loc/b").val();
		callback(pos);
	});
};

// Sets the coordinates of a player
// Returns nothing
v.player.control.setPos = function(guid, pos) {
	v.db.get().ref("players").child(guid).child("loc").set(pos);
};

// Moves a player if within acceptable movement speed
// Returns nothing
v.player.control.move = function(guid, pos) {
	v.d("Checking previous position");
	v.player.control.getPos(guid, function(oldpos) {
		v.d("Measuring distance");
		if(v.utils.distance(oldpos, pos) < 100) { // TODO: Change
			v.d("Moving player");
			v.player.setPos(guid, pos);
		} else {
			v.d("Player " + guid + " is moving too quickly!");
		}
	});
};
