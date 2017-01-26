v.ws = {};
v.state.pendingDisconnect = {};

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

v.ws.msg = function(ws, msg) {
	try {
		var d = JSON.parse(msg);
	} catch(ex) {
		v.ws.send(ws, "packet", "fail", "Invalid JSON");
		return;
	}
	
};

v.ws.send = function(ws, subj, status, data) {
	
};
