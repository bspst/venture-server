/**
 * WS - handles incoming and outgoing connections
 */
v.ws = {};
v.state.pendingDisconnect = {};

// Fired whenever a client connects
v.ws.connection = function(ws) {
	v.d("New WS connection");

	if(!v.initialized) {
		v.d("Not finished initializing");
		ws.send("WAIT");
		ws.close();
	}

	ws.on("message", function(msg) {
		v.ws.msg(ws, msg);
	});
	ws.on("close", function(e) {
		v.state.pendingDisconnect[ws.venture.guid] = new Date().getTime() + 10000;
	});
	var wsId = v.utils.makeGUID();
	ws.venture = {"guid": wsId, "playerID": null};
	v.ws.send(ws, "connection", true, { id: wsId });
};

// Fired whenever a client sends a message
v.ws.msg = function(ws, msg) {
	if(msg === null || msg === undefined || msg === "") return;
	msg = msg.toString();
	v.d("WS MSG");
	v.d(msg);
	if(msg.startsWith("{")) {
		try {
			var d = JSON.parse(msg);
            if(d.s == "login") {
				// Login
                status = v.auth.login(d.d.user, d.d.pass);
                if(status === false) {
                    v.ws.send(ws, d.s, false, "Wrong username or password");
                } else {
                    v.ws.send(ws, d.s, true, status);
                    ws.venture.playerID = status;

					v.d("User " + status + " logged in");
                }
			} else if(d.s == "register") {
				// Create a new account
				status = v.auth.register(d.d.user, d.d.pass);
				if(status === false) {
					v.ws.send(ws, d.s, false, "Username taken");
				} else {
					v.ws.send(ws, d.s, true, status);
					ws.venture.playerID = status;

					v.d("User " + status + " registered");
				}
			} else if(d.s == "uinfo") {
				// Returns public player info by GUID
				var info = JSON.parse(JSON.stringify(v.state.cache.players[d.d])); // Forces object clone
				delete info.auth;
				delete info.inventory;
				delete info.loc;
				delete info.info;
				info.guid = d.d;

				v.ws.send(ws, d.s, true, info);
			} else if(d.s == "container") {
				// Access container info and contents by GUID
				if(v.state.cache.containers[d.d]) {
					// TODO: Implement container access levels
					if(v.state.containers[d.d].accessLevel == 0) {
						// Container is public
						v.ws.send(ws, d.s, true, {
							name: v.ws.containers[d.d].name,
							items: v.container.items.list(d.d)
						});
					} else if(v.state.containers[d.d].accessLevel == 1) {
						// Private container, check if user owns it
						// TODO
					}
				} else v.ws.send(ws, d.s, false, "No such container");
			}
		} catch(ex) {
			v.ws.send(ws, "packet", false, ex);
			return;
		}
	} else {
		if(msg == "ping")
			ws.send("pong");
		else if(msg.startsWith("m")) {
			// Player movement
			var d = msg.substring(1).split(" ");
			//v.d("Moving... " + JSON.stringify(d));
			var newloc = {
				x: parseInt(d[0]),
				y: parseInt(d[1]),
				z: parseInt(d[2]),
				a: parseInt(d[3]),
				b: parseInt(d[4])
			};

			if(v.player.control.move(ws.venture.playerID, newloc)) {
				v.wss.clients.forEach(function each(client) {
					if(client.venture.playerID === null) return;
					else if(client.venture.playerID === ws.venture.playerID) return;
					else if(v.utils.distance(v.state.cache.players[client.venture.playerID].loc, newloc) < 1000) { // TODO: Change
						// Broadcast new location to players within 1000 units
						client.send("m" + ws.venture.playerID + msg.substring(1));
					}
				});
			}
		}
	}
};

// Sends a structured message to a client
v.ws.send = function(ws, subj, status, data) {
	ws.send(JSON.stringify({ "s": subj, "t": status, "d": data }));

	v.d("sent WS msg: " + subj + ", " + status + ", " + data + " to " + ws.venture.playerID);
};

// Broadcasts an unstructured message to all connected clients
v.ws.broadcast = function(d) {
	v.wss.clients.forEach(function each(client) {
		client.send(d);
	});
};
