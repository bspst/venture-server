/**
 * Auth - handles login validation
 */
v.auth = {};

// Checks if credentials are valid
// Returns user's GUID on success, false on failure.
v.auth.login = function(user, pass) {
	v.l("Login attempt: " + user);
	for(var guid in v.state.cache.players) {
		if(v.state.cache.players[guid].name == user) {
			v.d("User found, fetching data");
			var data = v.state.cache.players[guid];

			v.d("Verifying password");
			if(v.utils.hash("sha512", pass + data.auth.salt) === data.auth.pass) {
				// Login success
				v.l("User " + user + " logged in.");
				return guid;
			} else {
				v.l("Login failed for user " + user);
				return false;
			}
		}
	}
	return false;
};

// Creates a new user if it doesn't exist
// Returns user's GUID on success, false on failure.
v.auth.register = function(user, pass) {
	v.l("Registration attempt: " + user);
	for(var a in v.state.cache.players) {
		if(v.state.cache.players[a].name == user) return false;
	}

	require("crypto").randomBytes(256, function(err, buf) {
		var guid = v.utils.makeGUID(),
			salt = v.utils.hash("sha256", pass + buf.toString("hex")),
			hash = v.utils.hash("sha512", pass + salt);
			
		v.d("Registering user " + user + ", GUID " + guid);
		v.state.cache.players[guid] = {
			auth: {
				pass: hash,
				salt: salt
			},
			info: {
				joined: new Date().getTime()
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
		};
		
		return guid;
	});
	return false;
}
