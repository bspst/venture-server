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
                status = v.auth.login(d.d.user, d.d.pass);
                if(status === false) {
                    v.ws.send(ws, d.s, false, "Wrong username or password");
                } else {
                    v.ws.send(ws, d.s, true, status);
                    ws.venture.playerID = status;

					v.d("User " + status + " logged in");
                }
			} else if(d.s == "register") {
				status = v.auth.register(d.d.user, d.d.pass);
				if(status === false) {
					v.ws.send(ws, d.s, false, "Username taken");
				} else {
					v.ws.send(ws, d.s, true, status);
					ws.venture.playerID = status;

					v.d("User " + status + " registered");
				}
			} else if(d.s == "uinfo") {
				// TODO: return user info
			}
		} catch(ex) {
			v.ws.send(ws, "packet", "fail", "Invalid JSON");
			return;
		}
	} else {
		if(msg == "ping")
			ws.send("pong");
		else if(msg.startsWith("m")) {
			// Player movement
			var d = msg.substring(1).split(" ");
			v.d("Moving... " + JSON.stringify(d));
			v.player.control.move(ws.venture.playerID, { x: d[0], y: d[1], z: d[2], a: d[3], b: d[4] });
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
