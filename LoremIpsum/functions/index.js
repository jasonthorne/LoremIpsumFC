
const functions = require("firebase-functions"); //functions library
const admin = require("firebase-admin"); //admin library for allowing functions to run in an authenticated mode
const cors = require('cors')({origin: true}); //cors libary to allow requests from clients

admin.initializeApp();

//post comment function:
exports.postComment = functions.https.onRequest((request, response) => {

//1. receive comment data in here from POST request ".onRequest((request))"
//2. connect to firestore db using admin library:
//search firestore collections for "comments", then add contents of request body
return admin.firestore().collection("comments").add(request.body).then(()=>{
    //.then() callback function, that's returned from server to client when request.body is added to db:
    response.send("Saved comment in the database");
  });
});

//get comments function:
exports.getComments = functions.https.onRequest((request, response) => {
  
  // 1. Connect to our firestore database
  cors(request, response, () => {

    let myData = []
    //////////admin.firestore().collection("comments").orderBy("date", "desc").get().then((snapshot) => {
    admin.firestore().collection("comments").get().then((snapshot) => {

        if (snapshot.empty) {
            console.log("No matching documents.");
            response.send("No data in database");
            return; //return if no data
        }
        //add raw object data:
        snapshot.forEach(doc => { myData.push(doc.data());});
        // 2. Send data back to client
        response.send(myData);
    })
  })
});


/*
exports.postcomment = functions.https.onRequest((request, response) => {

  const currentTime = admin.firestore.Timestamp.now();
  request.body.timestamp = currentTime;

  return admin.firestore().collection('comments').add(request.body).then(()=>{
      response.send("Saved comment in the database");
  });
});*/




/*
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello dawg!");
 });
*/