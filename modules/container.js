/**
 * Container - stores items and its data
 */
v.container = {};

// Creates an empty container
// Returns the new container's GUID on success, false on failure.
v.container.create = function() {
	var guid = v.utils.makeGUID();
	v.db.ref('containers').child(guid).set({
		'name': 'Container',
		'capacity': 50
	});
	return guid;
};

// Destroys a container with the specified GUID
// Returns true on success, false on failure.
v.container.destroy = function(guid) {
	v.db.ref('containers').child(guid).set(null);
};

v.container.items = {};

// List items present in a container
// Returns an array of item GUIDs
v.container.items.list = function(guid, callback) {
	v.db.ref('items').orderByChild('container').equalTo(guid).once('value').then(function(ds) {
		ds.forEach(function(itemSnapshot) {
			// TODO: implement
		});
	});
};

// Moves an item into a container.
// Returns true on success, false on failure.
v.container.items.add = function(guid, itemGuid) {
	
};
