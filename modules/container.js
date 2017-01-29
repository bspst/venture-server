/**
 * Container - stores items and its data
 */
v.container = {};

// Creates an empty container
// Returns the new container's GUID on success, false on failure.
v.container.create = function(name) {
	var guid = v.utils.makeGUID();
	v.state.cache.containers[guid] = {
		"name": name,
		"capacity": 50
	};
	return guid;
};

// Destroys a container with the specified GUID
// Returns true on success, false on failure.
v.container.destroy = function(guid) {
	delete v.state.cache.containers;
};

v.container.items = {};

// List items present in a container
// Returns an array of item GUIDs
v.container.items.list = function(guid, callback) {
	var items = [];
	for(var i in v.state.cache.items) {
		if(v.state.cache.items[i].container == guid)
			items.push(i);
	}
	return items;
};

// Moves an item into a container.
// Returns true on success, false on failure.
v.container.items.add = function(guid, itemGuid) {
	
};
