console.log('Starting server');
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: (process.env.PORT || 5000)}),
	venture = require('./venture.js');//,
	//firebase = require('firebase');

/*
firebase.initializeApp({
	serviceAccount: JSON.parse(process.env.firebaseSA),
	databaseURL: process.env.firebaseDB
});

var db = {
	conn: null,
	firebase: firebase,
	connect: function() {
		this.conn = this.firebase.database();
	}
};
*/

venture.init(wss);
wss.on('connection', venture.ws.connection);
console.log('Server started');