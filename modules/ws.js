/**
 * WS - handles incoming and outgoing connections
 */
v.ws = {};
v.state.pendingDisconnect = {};

// Fired whenever a client connects
v.ws.connection = function(ws) {
	ws.on("message", function(msg) {
		v.ws.msg(ws, msg);
	});
	ws.on("close", function(e) {
		v.state.pendingDisconnect[ws.venture.guid] = new Date().getTime() + 10000;
	});
	var wsId = v.utils.makeGUID();
	ws.venture = {"guid": wsId, "playerID": null};
	v.ws.send(ws, "connection", true, { id: wsId });

	v.d("New WS connection");
};

// Fired whenever a client sends a message
v.ws.msg = function(ws, msg) {
	v.d("WS MSG");
	if(msg.startsWith("{")) {
		try {
			var d = JSON.parse(msg);
            if(d.s == "login") {
                v.auth.login(d.d.user, d.d.pass, function(status) {
                    if(status === false) {
                        v.ws.send(ws, d.s, false, "Wrong username or password");
                    } else {
                        v.ws.send(ws, d.s, true, status);
                        ws.venture.playerID = status;

						v.d("User " + status + " logged in");
                    }
                });
			} else if(d.s == "register") {
				v.auth.register(d.d.user, d.d.pass, function(status) {
					if(status === false) {
						v.ws.send(ws, d.s, false, "Username taken");
					} else {
						v.ws.send(ws, d.s, true, status);
						ws.venture.playerID = status;

						v.d("User " + status + " registered");
					}
				});
			}
		} catch(ex) {
			v.ws.send(ws, "packet", "fail", "Invalid JSON");
			return;
		}
	} else {
		// TODO
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
