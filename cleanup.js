console.log('cleanup started');

var firebase = require('firebase'), //npm install firebase
    firebaseTokenGenerator = require("firebase-token-generator"),  //creates a user token for remote access
    tokenGenerator = new firebaseTokenGenerator(process.env.FirebaseSecret),  //secret key set in environmnet variable : do not hardcode
    tokenExpires = new Date("01/01/2025").getTime(), // (new Date().getTime() / 1000)+(4 * 7 * 24 * 60 * 60), // in four weeks
    firebaseToken = tokenGenerator.createToken(
        {uid: "1", username: 'admin'},
        {admin: true}
    ),
    baseRef =  new firebase( process.env.FirebaseUrl );

var baseRooms = {
    "355e25fe-b0ac-477d-8464-a7a4b39f1149":{"apiKey":"45254262","id":"355e25fe-b0ac-477d-8464-a7a4b39f1149","isPrivate":false,"isRoom":true,"jid":"","joined":false,"myJID":"/","name":"Default Room One","nickname":"","num_participants":"","owner":"","privacy":"","sessionId":"1_MX40NTI1NDI2Mn5-MTQzODM3NjAwNDc0NX5KQ3d0R2lzc2g2MGF3cmR3Mm9XSzRRR25-UH4","topic":"","unread_messages":0,"xmpp_name":""},
    "6b898376-7bf1-4230-9d09-b73f6c21492b":{"apiKey":"45254262","id":"6b898376-7bf1-4230-9d09-b73f6c21492b","isPrivate":false,"isRoom":true,"jid":"","joined":false,"myJID":"/","name":"Default Room Two","nickname":"","num_participants":"","owner":"","privacy":"","sessionId":"2_MX40NTI1NDI2Mn5-MTQzODM3NTUyODE2M35mSFdIUlVoVzRLUE9wbnd6a3QrR1UrdFl-UH4","topic":"","unread_messages":0,"xmpp_name":""},
    "72fcad98-f262-47a3-99f5-7f5533650128":{"apiKey":"45254262","id":"72fcad98-f262-47a3-99f5-7f5533650128","isPrivate":false,"isRoom":true,"jid":"","joined":false,"myJID":"/","name":"Default Room Three","nickname":"","num_participants":"","owner":"","privacy":"","sessionId":"1_MX40NTI1NDI2Mn5-MTQzODc4NTA4MTYyNX5yeDRhc2JVWHZZdTdXM2U0Uy8weFRaK2Z-UH4","topic":"","unread_messages":0,"xmpp_name":""}}

baseRef.authWithCustomToken(firebaseToken, function(error, result) {
    if (error) {
        console.log("Authentication Failed!", error);
    } else {
        baseRef.set({"rooms" : baseRooms});
        console.log('cleanup finished');
        setTimeout(function() {
            process.exit(0);
        }, 2000);

    }
});

