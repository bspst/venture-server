/**
 * Item - in-game inventory items
 */
v.item = {};

// Fetches an item's attributes
// Returns a JavaScript object containing the item's attributes.
v.item.getInfo = function(guid) {
	return v.db.get().ref("items").ref(guid).val();
};

// Creates an empty item
// Returns the new item's GUID on success, false on failure.
v.item.create = function() {
	
};

// Destroys an item and removes it from its container
// Returns true on success, false on failure.
v.item.destroy = function(guid) {
	
};
