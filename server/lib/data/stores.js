var firebase = require('firebase'), //npm install firebase
firebaseTokenGenerator = require("firebase-token-generator"),  //creates a user token for remote access
tokenGenerator = new firebaseTokenGenerator(process.env.FIREBASE_SKEY || ''),  //secret key set in environmnet variable : do not hardcode
tokenExpires = new Date("01/01/2025").getTime(), // (new Date().getTime() / 1000)+(4 * 7 * 24 * 60 * 60), // in four weeks
OpenTok = require('opentok'); // OpenTok WebRTC service calls  http://www.tokbox.com

var data = {

    baseRef: new firebase("https://senchartc.firebaseio.com/"),

    firebaseToken: tokenGenerator.createToken(
        {tokenBy: "NodeServerToken"},  //Arbitrary info to pass along into the user token object
        {admin: true, expires: tokenExpires}
    ),

    wrapresponse: function  (data,total){
        return {
                "success": true,
                "message": "Successful",
                "total": total,
                "timestamp": new Date(),
                "data" : data
        }
    },

    _getToken: function (req, res, id){
        var session = id,
            role = req.body['role'] || 'publisher',
            name = req.body['name'] || 'anonymous',
            otApiKey = App.get('otAPIKEY'),
            otApiSecret = App.get('otAPISECRET'),
            opentok = new OpenTok(otApiKey, otApiSecret),
            token = opentok.generateToken(session,{
                  role :       role,
                 // expireTime : tokenExpires,
                  data :       'name=' + name
            }),
            data = {
                apiKey: process.env.OPENTOK_APIKEY || '',
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
                        res.status(200).send(module.exports.wrapresponse(module.exports._rooms,module.exports._rooms.length) );
                    }

                    //now watch for changes
                    rooms.on('value', function(childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined){
                            var data = childSnapshot.val();
                            module.exports._rooms = data;
                            var roomsIo = App.io;
                            roomsIo.emit('rooms',data);
                            console.log('rooms changed');
                        }
                    });
                }
            });



        }else{
            res.status(200).send(module.exports.wrapresponse(module.exports._rooms,module.exports._rooms.length) );
        }

    },
    //for AJAX
    addglobal: function(req, res, id){
        this._getToken(req, res, App.get('otSessionId'))
    },

    //a global room that's always up
    getglobal: function(req, res){
        this._getToken(req, res, App.get('otSessionId'))
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
