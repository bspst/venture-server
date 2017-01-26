v.ws = {};
v.ws.connection = function(ws) {
	ws.on('message', function(msg) {
		v.ws.msg(ws, msg);
	});
	ws.on('close', function(e) {
		v.pendingDisconnect[ws.venture.guid] = new Date().getTime() + 10000;
	});
	var wsId = v.utils.makeGUID();
	ws.venture = {"guid": wsId};
	v.sendPacket(ws, "connection", "success", {id: wsId});
};
