/**
 * WS - handles incoming and outgoing connections
 */
v.ws = {};
v.state.pendingDisconnect = {};

// Fired whenever a client connects
v.ws.connection = function(ws) {
	ws.on('message', function(msg) {
		v.ws.msg(ws, msg);
	});
	ws.on('close', function(e) {
		v.state.pendingDisconnect[ws.venture.guid] = new Date().getTime() + 10000;
	});
	var wsId = v.utils.makeGUID();
	ws.venture = {"guid": wsId};
	v.sendPacket(ws, "connection", "success", {id: wsId});
};

// Fired whenever a client sends a message
v.ws.msg = function(ws, msg) {
	if(msg.startsWith("{")) {
		try {
			var d = JSON.parse(msg);
		} catch(ex) {
			v.ws.send(ws, "packet", "fail", "Invalid JSON");
			return;
		}
	} else {
		
	}
};

// Sends a structured message to a client
// Does not return any value.
v.ws.send = function(ws, subj, status, data) {
	ws.send(JSON.stringify({"s": subj, "t": status, "d": data}));
};
