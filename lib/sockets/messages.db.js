var firebase = require('firebase'), //npm install firebase
    firebaseTokenGenerator = require("firebase-token-generator"),  //creates a user token for remote access
    tokenGenerator = new firebaseTokenGenerator(global.App.config.get('adminsettings').serviceprovider.firebase.SecretKey || ''),  //secret key set in environmnet variable : do not hardcode
    tokenExpires = new Date("01/01/2025").getTime(), // (new Date().getTime() / 1000)+(4 * 7 * 24 * 60 * 60), // in four weeks

    OpenTok = require('opentok'); // OpenTok WebRTC service calls  http://www.tokbox.com

var messages = {
    _firebaseToken: tokenGenerator.createToken(
        {tokenBy: "NodeServerToken"},  //Arbitrary info to pass along into the user token object
        {admin: true, expires: tokenExpires}
    ),

    _baseRef: new firebase( global.App.config.get('adminsettings').serviceprovider.firebase.Url ),
    _messages: [],

    getOpenTokSessionId: function(callback){
        var ApiKey = global.App.config.get('adminsettings').serviceprovider.opentok.ApiKey,
            ApiSecret = global.App.config.get('adminsettings').serviceprovider.opentok.ApiKey,
            opentok = new OpenTok(ApiKey, ApiSecret);

        opentok.createSession(function(err, session) {
                if (err) return console.log(err);
                callback(null,session.sessionId );
            }
        );
    },

    getAll: function(callback) {
        var me = this;
        if(me._messages.length == 0){

            me._messagesRef =  me._baseRef.child('messages');

            me._messagesRef.once('value', function(childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined){

                    var data = childSnapshot.val();
                    me._messages = data;
                    callback(null,data);

                    //now watch and emit changes
                    me._messagesRef.on('value', function(childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined){
                            var data = childSnapshot.val();
                            me._messages = data;
                            App.io.of('/messages').emit('all', data);
                        }
                    });
                }
            });

        }else{
            callback(null,me._messages);
        }
    },

    bindFirebase: function(io){
        var me = this;
        if(!io._messagesRef) {

            io._messagesRef = me._baseRef.child('messages');

            /*
             me._messagesRef.on('value', function (childSnapshot, prevChildName) {
             if (childSnapshot.val() && childSnapshot.val() != undefined) {
             var data = childSnapshot.val();
             me._messages = Object.keys(data).map(function (k) {
             return data[k]
             });
             App.io.of('/messages').emit('datachanged', me._messages);
             }
             });
             */

            io._messagesRef.on('child_added', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/messages').emit('child_added', global.App.wrapresponse(data));
                }
            });
            io._messagesRef.on('child_removed', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/messages').emit('child_removed', global.App.wrapresponse(data));
                }
            });
            io._messagesRef.on('child_changed', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/messages').emit('child_changed', global.App.wrapresponse(data));
                }
            });
            io._messagesRef.on('child_moved', function (childSnapshot, prevChildName) {
                if (childSnapshot.val() && childSnapshot.val() != undefined) {
                    var data = childSnapshot.val();

                    App.io.of('/messages').emit('child_moved', global.App.wrapresponse(data));
                }
            });
        }
    },

    read: function(config,callback){
        var me = this;

        me._baseRef.child('messages/' + config.params.room ).once('value', function(childSnapshot, prevChildName) {
            if (childSnapshot.val() && childSnapshot.val() != undefined){
                var data = childSnapshot.val(),
                    arraymessages = Object.keys(data).map(function(k) { return data[k] });
                callback(null,arraymessages);
            }else{
                callback(null,[]);
            }
        });

    },

    create: function(config,callback){
        var me = this,
            records = config.records;

        if(records instanceof Array){
            records.forEach(function(item) {
                me._baseRef.child('messages/' + config.params.room + '/' + item.id).update(item);
                callback(null,[item.records]);
            });
        }else{
            me._baseRef.child('messages/' + config.params.room + '/' + config.records.id).update(config.records);
            callback(null, [config.records]);
        }

    },

    update: function(config,callback){
        var me = this,
            records = config.records;

        if(records instanceof Array){
            records.forEach(function(item) {
                me._baseRef.child('messages/' + config.params.room + '/' + item.id).update(item);
                callback(null,[item.records]);
            });
        }else{
            me._baseRef.child('messages/' + config.params.room + '/' + config.records.id).update(config.records);
            callback(null,[config.records]);
        }
    },

    delete: function(config,callback){
        var me = this,
            records = config.records;

        if(records instanceof Array){
            records.forEach(function(item) {
                me._baseRef.child('messages/'  + config.params.room + '/' + item.id).remove();
                callback(null,item);
            });
        }else{
            me._baseRef.child('messages/'  + config.params.room + '/' + config.records.id).remove();
            callback(null,records);
        }
    }
};

module.exports = messages;