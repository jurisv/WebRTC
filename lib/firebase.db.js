module.exports = function(nconf){

    var _firebase = require('firebase'),
        firebaseTokenGenerator = require("firebase-token-generator"),  //creates a user token for remote access
        tokenGenerator = new firebaseTokenGenerator(nconf.get('adminsettings').serviceprovider.firebase.SecretKey || ''),  //secret key set in environmnet variable : do not hardcode
        tokenExpires = new Date("01/01/2025").getTime(), // (new Date().getTime() / 1000)+(4 * 7 * 24 * 60 * 60), // in four weeks
        firebaseToken =  tokenGenerator.createToken(
            {tokenBy: "NodeServerToken"},  //Arbitrary info to pass along into the user token object
            {admin: true, expires: tokenExpires}
        ),
        firebase =  new _firebase( nconf.get('adminsettings').serviceprovider.firebase.Url );

    firebase.authWithCustomToken(firebaseToken, function(error, result) {
        if (error) {
            console.log("Authentication Failed!", error);
        }
    });

    return firebase
};