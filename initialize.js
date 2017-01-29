console.log("Starting server");
var venture = require("./venture.js"),
	fbAdmin = require("firebase-admin"),
	adminCred = null;

console.log("Fetching Firebase Service Account");
if(process.env.debug == "1") {
	adminCred = "../ServiceAccount.json";
} else {
	adminCred = JSON.parse(process.env.firebaseSA);
}

console.log("Initializing Firebase");
fbAdmin.initializeApp({
	credential: fbAdmin.credential.cert(adminCred),
	databaseURL: "https://projectventure-fb408.firebaseio.com"
});

console.log("Initializing Venture Server");
venture.init(fbAdmin);

console.log("Initializing SIGINT handler");
if(process.platform === "win32") {
	var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on("SIGINT", function() {
		process.emit("SIGINT");
	});
}
process.on("SIGINT", function() {
	v.l("Closing WSS");
	v.wss.close(function() {
		v.l("Pushing changes...");
		v.db.pushf(function() {
			v.l("Done pushing changes, quitting");
			process.exit();
		});
	});
});

v.l("Server started!");
