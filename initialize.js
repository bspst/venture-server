console.log('Starting server');
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: (process.env.PORT || 5000)}),
	venture = require('./venture.js'),
	fbAdmin = require('firebase-admin'),
	adminCred = null;

if(process.env.debug == '1') {
	adminCred = '../ServiceAccount.json';
} else {
	adminCred = JSON.parse(process.env.firebaseSA);
}

fbAdmin.initializeApp({
	credential: fbAdmin.credential.cert(adminCred),
	databaseURL: 'https://projectventure-fb408.firebaseio.com'
});

venture.init(wss, fbAdmin);

v.d('Server started!');
