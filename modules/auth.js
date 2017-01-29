/**
 * Auth - handles login validation
 */
v.auth = {};

// Checks if credentials are valid
// Returns user's GUID on success, false on failure.
v.auth.login = function(user, pass, callback) {
	v.l("Login attempt: " + user);
	v.db.get().ref("players").orderByChild("name").equalTo(user).once("value").then(function(ds) {
		if(ds.val() === null) {
			// User doesn"t exist
			v.d("User doesn't exist, cancelling login");
			callback(false);
			return;
		}
		
		v.d("User found, fetching data");
		var player = ds.val(),
			guid = Object.keys(player)[0],
			data = player[guid];
		
		v.d("Verifying password");
		if(v.utils.hash("sha512", pass + data.auth.salt) === data.auth.pass) {
			// Login success
			v.l("User " + user + " logged in.");
			callback(guid);
			return;
		} else {
			v.l("Login failed for user " + user);
			callback(false);
			return;
		}
	});
};

// Creates a new user if it doesn't exist
// Returns user's GUID on success, false on failure.
v.auth.register = function(user, pass, callback) {
	v.l("Registration attempt: " + user);
	v.db.get().ref("players").orderByChild("name").equalTo(user).once("value").then(function(ds, s) {
		if(ds.val() === null) {
			v.d("User doesn't exist, continuing on...");
			if(!/^[a-zA-Z0-9_]{3,64}$/.test(user)) {
				v.d("Registration fail: invalid username");
				callback(false);
				return;
			}
			
			require("crypto").randomBytes(256, function(err, buf) {
				var guid = v.utils.makeGUID(),
					salt = v.utils.hash("sha256", pass + buf.toString("hex")),
					hash = v.utils.hash("sha512", pass + salt);
			
				v.d("Registering user " + user + ", GUID " + guid);
				v.db.get().ref("players").child(guid).set({
					auth: {
						pass: hash,
						salt: salt
					},
					inventory: v.container.create("Inventory"),
					loc: {
						x: 0, y: 0, z: 0, a: 0, b: 0
					},
					model: "default",
					name: user,
					stats: {
						current_hp: 50,
						max_hp: 50,
						max_dex: 10,
						max_str: 10
					}
				});
			
				callback(guid);
				return;
			});
			return;
		} else {
			v.d("Registration fail: username taken");
			callback(false);
			return;
		}
	});

	return;
}
