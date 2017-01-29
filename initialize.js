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

v.l("Server started!");
