/**
 * Item - in-game inventory items
 */
v.item = {};

// Fetches an item's attributes
// Returns a JavaScript object containing the item's attributes.
v.item.getInfo = function(guid) {
	v.db.get().ref('items').child(guid).once('value')
		.then(function(ds) {
			callback(ds.val());
		});
};

// Creates an empty item
// Returns the new item's GUID on success, false on failure.
v.item.create = function() {
	var guid = v.utils.makeGUID();
	v.db.get().ref('items').child(guid).set({
		'name': 'Item',
		'owner': '00000000-0000-0000-0000-000000000000',
		'type': 0,
		'weight': 0
	});
	return guid;
};

// Destroys an item and removes it from its container
// Does not return any value.
v.item.destroy = function(guid) {
	v.db.get().ref('items').child(guid).set(null);
};
