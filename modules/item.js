/**
 * Item - in-game inventory items
 */
v.item = {};

// Fetches an item's attributes
// Returns a JavaScript object containing the item's attributes.
v.item.getInfo = function(guid) {
	v.db.get().ref('items').child(guid).once('value')
		.then(function(ds) {
			var info = {};
			info.name = ds.child('name').val;
			info.type = ds.child('type').val;
			info.weight = ds.child('weight').val;
			info.stats = {};
			info.stats.atk = ds.child('stats/atk').val;
			info.stats.def = ds.child('stats/def').val;
			info.stats.max_dur = ds.child('stats/max_dur').val;
			info.stats.current_dur = ds.child('stats/current_dur').val;
			
			callback(info);
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
