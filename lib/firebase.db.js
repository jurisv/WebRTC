module.exports = function(nconf){

    var Firebase,
        _firebase = require('firebase'),
        firebaseTokenGenerator = require("firebase-token-generator"),  //creates a user token for remote access
        tokenGenerator,
        tokenExpires = new Date("01/01/2025").getTime(), // (new Date().getTime() / 1000)+(4 * 7 * 24 * 60 * 60), // in four weeks
        firebaseToken,
        ApiSecret = process.env.FirebaseSecret,
        URL = process.env.FirebaseUrl;


    if(!ApiSecret && nconf.get('adminsettings').serviceprovider.firebase.SecretKey != undefined){
        tokenGenerator = new firebaseTokenGenerator(nconf.get('adminsettings').serviceprovider.firebase.SecretKey);  //secret key set in environmnet variable : do not hardcode
        Firebase =  new _firebase( nconf.get('adminsettings').serviceprovider.firebase.Url );
    }else{
        tokenGenerator = new firebaseTokenGenerator(ApiSecret);  //secret key set in environmnet variable : do not hardcode
        Firebase =  new _firebase( URL );
    }

    firebaseToken =  tokenGenerator.createToken({ nodeAdmin: true, uid:'nodeAdmin'},{admin: false, expires: tokenExpires});

    Firebase.authWithCustomToken(firebaseToken, function(error, result) {
        if (error) {
            console.log("Authentication Failed!", error);
        }else{
            console.log("Firebase is now Authenticated", result);
        }
    });

    Firebase.token = firebaseToken;

    return Firebase;

};