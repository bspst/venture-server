/**
 * Auth - handles login validation
 */
v.auth = {};

// Checks if credentials are valid
// Returns user's GUID on success, false on failure.
v.auth.login = function(user, pass, callback) {
	v.db.get().ref('players').orderByChild('name').equalTo(user).once('value').then(function(ds) {
		if(ds.val() === null) {
			callback(false);
			return;
		}
		var player = ds.val(),
			guid = Object.keys(data)[0],
			data = player[guid];
		
		if(v.utils.hash('sha512', pass + data.auth.salt) == data.auth.pass) {
			// Login success
			callback(guid);
		} else callback(false);
	});
};
