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

    getOpenTokSessionId: function(callback){
        var otApiKey = App.get('otAPIKEY'),
            otApiSecret = App.get('otAPISECRET'),
            opentok = new OpenTok(otApiKey, otApiSecret);

        opentok.createSession(function(err, session) {
            if (err) return console.log(err);
                callback(null,session.sessionId );
            }
        );
    },

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

    bindFirebase: function(io){
        var me = this;
        if(!io._roomsRef) {

            io._roomsRef = me._baseRef.child('rooms');

            /*
            me._roomsRef.on('value', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();
                    me._rooms = Object.keys(data).map(function (k) {
                        return data[k]
                    });
                    App.io.of('/rooms').emit('datachanged', me._rooms);
                }
            });
            */

            io._roomsRef.on('child_added', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/rooms').emit('child_added', data);
                }
            });
            io._roomsRef.on('child_removed', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/rooms').emit('child_removed', data);
                }
            });
            io._roomsRef.on('child_changed', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/rooms').emit('child_changed', data);
                }
            });
            io._roomsRef.on('child_moved', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/rooms').emit('child_moved', data);
                }
            });
        }
    },

    read: function(config,callback){
        var me = this;

        me._baseRef.child('rooms/').once('value', function(childSnapshot, prevChildName) {
            if (childSnapshot.val() && childSnapshot.val() != undefined){
                var data = childSnapshot.val(),
                arrayRooms = Object.keys(data).map(function(k) { return data[k] });
                callback(null,arrayRooms);
            }
         });

    },

    create: function(config,callback){
      var me = this,
          records = config.records;

         if(records instanceof Array){
             records.forEach(function(item) {
                 me.getOpenTokSessionId(function(err,sessionId){
                     item.records.sessionId = sessionId;
                     item.records.apiKey = App.get('otAPIKEY');
                     me._baseRef.child('rooms/' + item.id).update(item);
                     callback(null,[item.records]);
                 });
             });
         }else{
             me.getOpenTokSessionId(function(err,sessionId){
                 config.records.sessionId = sessionId;
                 config.records.apiKey = App.get('otAPIKEY');
                 me._baseRef.child('rooms/' + config.records.id).update(config.records);
                 callback(null, [config.records]);
             });
         }

    },

    update: function(config,callback){
        var me = this,
            records = config.records;

        if(records instanceof Array){
            records.forEach(function(item) {
                me._baseRef.child('rooms/' + item.id).update(item);
                callback(null,[item.records]);
            });
        }else{
            me._baseRef.child('rooms/' + config.records.id).update(config.records);
            callback(null,[config.records]);
        }
    },

    delete: function(config,callback){
        var me = this,
            records = config.records;

        if(records instanceof Array){
            records.forEach(function(item) {
                me._baseRef.child('rooms/' + item.id).remove();
                callback(null,item);
            });
        }else{
            me._baseRef.child('rooms/' + config.records.id).remove();
            callback(null,records);
        }
    }
};
 
module.exports = rooms;