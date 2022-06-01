

const functions = require("firebase-functions");

/*admin library for allowing server code (functions) to run in an authenticated mode
//this means code can CRUD docs securely*/
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello dawg!");
 });
