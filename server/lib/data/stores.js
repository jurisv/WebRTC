var firebase = require('firebase'), //npm install firebase
firebaseTokenGenerator = require("firebase-token-generator"),  //creates a user token for remote access
tokenGenerator = new firebaseTokenGenerator(global.App.config.get('adminsettings').serviceprovider.firebase.SecretKey || ''),  //secret key set in environmnet variable : do not hardcode
tokenExpires = new Date("01/01/2025").getTime(), // (new Date().getTime() / 1000)+(4 * 7 * 24 * 60 * 60), // in four weeks
OpenTok = require('opentok'); // OpenTok WebRTC service calls  http://www.tokbox.com

var data = {

    baseRef: new firebase(global.App.config.get('adminsettings').serviceprovider.firebase.Url),

    firebaseToken: tokenGenerator.createToken(
        {tokenBy: "NodeServerToken"},  //Arbitrary info to pass along into the user token object
        {admin: true, expires: tokenExpires}
    ),


    _getToken: function (req, res, id){
        var session = id,
            ApiKey = global.App.config.get('adminsettings').serviceprovider.opentok.ApiKey,
            ApiSecret = global.App.config.get('adminsettings').serviceprovider.opentok.SecretKey,
            opentok = new OpenTok(ApiKey, ApiSecret),
            role, name, token, data;

        if(req.body){
            role = req.body['role'] || 'publisher';
            name = req.body['name'] || 'anonymous';
        }else{
            role = 'publisher';
            name = 'anonymous';
        }

        token = opentok.generateToken(session,{
              role :       role,
             // expireTime : tokenExpires,
              data :       'name=' + name
        });

        data = {
            apiKey: ApiKey || '',
            sessionId: session,
            token: token
        };
        //send the global app sessionId setup during startup
        res.status(200).send(data);
    },

    _getusers: function(req, res){
        res.status(200).send('user');
    },

    _rooms: [],

    getrooms: function(req, res, id){

        if(module.exports._rooms.length == 0){

            var rooms = module.exports.baseRef.child('rooms');

            rooms.once('value', function(childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined){
                    var data = childSnapshot.val();
                    module.exports._rooms = data;
                    if(res){
                        res.status(200).send(global.App.wrapresponse(module.exports._rooms) );
                    }

                    //now watch for changes and update cache
                    rooms.on('value', function(childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined){
                            var data = childSnapshot.val();
                            module.exports._rooms = data;
                        }
                    });
                }
            });



        }else{
            res.status(200).send(global.App.wrapresponse(module.exports._rooms) );
        }

    },
    //for AJAX
    addglobal: function(req, res, id){
        this._getToken(req, res, global.App.ServerConfig['otDefaultSessionId'])
    },

    //a global room that's always up
    getglobal: function(req, res){
        this._getToken(req, res, global.App.ServerConfig['otDefaultSessionId'])
    },

    //a token for a room
    addtoken: function(req, res, id){
        this._getToken(req, res, id)
    },
    //a token for a room
    gettoken: function(req, res, id){
        this._getToken(req, res, id)
    }

};

module.exports = data;
