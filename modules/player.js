/**
 * Player - 
 */
v.player = {};

// Gets a value from the player's data
// Returns an object
v.player.getValue = function(guid, key, callback) {
	v.db.get().ref("players").child(guid).once("value").then(function(ds) {
		callback(ds.child(key).val());
	});
}

// Fetches the player's name
// Returns a string
v.player.getName = function(guid, callback) {
	v.player.getValue(guid, "name", callback);
}

// Fetches the character model of a player
// Returns the name of the model on success, false on failure.
v.player.getModel = function(guid) {
	
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
