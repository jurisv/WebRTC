var firebase = require('firebase'), //npm install firebase
    firebaseTokenGenerator = require("firebase-token-generator"),  //creates a user token for remote access
    tokenGenerator = new firebaseTokenGenerator(process.env.FIREBASE_SKEY || ''),  //secret key set in environmnet variable : do not hardcode
    tokenExpires = new Date("01/01/2025").getTime(), // (new Date().getTime() / 1000)+(4 * 7 * 24 * 60 * 60), // in four weeks

    OpenTok = require('opentok'); // OpenTok WebRTC service calls  http://www.tokbox.com

var rooms = {
    _firebaseToken: tokenGenerator.createToken(
        {tokenBy: "NodeServerToken"},  //Arbitrary info to pass along into the user token object
        {admin: true, expires: tokenExpires}
    ),

    _baseRef: new firebase("https://senchartc.firebaseio.com/"),
    _rooms: [],

    getAll: function(callback) {
        var me = this;
        if(me._rooms.length == 0){

                me._roomsRef =  me._baseRef.child('rooms');

                me._roomsRef.once('value', function(childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined){

                    var data = childSnapshot.val();
                    me._rooms = data;
                    callback(null,data);

                    //now watch and emit changes
                    me._roomsRef.on('value', function(childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined){
                            var data = childSnapshot.val();
                            me._rooms = data;
                            App.io.of('/rooms').emit('all', data);
                        }
                    });
                }
            });

        }else{
            callback(null,me._rooms);
        }
    },

    save: function(room, callback) {
      //  db.rooms.insert(room, callback);
    },

    update: function(room, callback) {
        /*
        db.rooms.update({
            id: room.id
        }, room, {}, callback);
        */
    },

    delete: function(id, callback) {
        /*
        db.rooms.remove({
            id: id
        }, '', callback);
        */
    }
};
 
module.exports = rooms;