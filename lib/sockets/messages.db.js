var OpenTok = require('opentok'), // OpenTok WebRTC service calls  http://www.tokbox.com
    wrap = require('./../wrapjsonresponse.js');

module.exports = function(io, nconf, firebase){

   var messages = {

        _messages: [],

        getOpenTokSessionId: function(callback){
            var ApiKey = nconf.get('adminsettings').serviceprovider.opentok.ApiKey,
                ApiSecret = nconf.get('adminsettings').serviceprovider.opentok.ApiKey,
                opentok = new OpenTok(ApiKey, ApiSecret);

            opentok.createSession(function(err, session) {
                    if (err) return console.log(err);
                    callback(null,session.sessionId );
                }
            );
        },

      /*  getAll: function(callback) {
            var me = this;
            if(me._messages.length == 0){

                me._messagesRef = firebase.child('messages');

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
                                io.of('/messages').emit('all', data);
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

                me._baseRef.authWithCustomToken(me._firebaseToken, function(error, result) {
                    if (error) {
                        console.log("Authentication Failed!", error);
                    } else {
                    }
                });
                io._messagesRef = me._baseRef.child('messages');

                /!*
                 me._messagesRef.on('value', function (childSnapshot, prevChildName) {
                 if (childSnapshot.val() && childSnapshot.val() != undefined) {
                 var data = childSnapshot.val();
                 me._messages = Object.keys(data).map(function (k) {
                 return data[k]
                 });
                 io.of('/messages').emit('datachanged', me._messages);
                 }
                 });
                 *!/

                /!* io._messagesRef.on('child_added', function (childSnapshot, prevChildName) {
                 if (childSnapshot.val() && childSnapshot.val() != undefined) {
                 var data = childSnapshot.val();

                 io.of('/messages').emit('child_added', app.wrapresponse(data));
                 }
                 });
                 *!/

                io._messagesRef.on('child_removed', function (childSnapshot, prevChildName) {
                    if (childSnapshot.val() && childSnapshot.val() != undefined) {
                        var data = childSnapshot.val();

                        io.of('/messages').emit('child_removed', app.wrapresponse(data));
                    }
                });

                io._messagesRef.on('child_changed', function (childSnapshot, prevChildName) {
                    if (childSnapshot.val() && childSnapshot.val() != undefined) {
                        var data = childSnapshot.val();

                        io.of('/messages').emit('child_changed', app.wrapresponse(data));
                    }
                });

                /!*
                 io._messagesRef.on('child_moved', function (childSnapshot, prevChildName) {
                 if (childSnapshot.val() && childSnapshot.val() != undefined) {
                 var data = childSnapshot.val();

                 app.io.of('/messages').emit('child_moved', app.wrapresponse(data));
                 }
                 });
                 *!/
            }
        },
*/

        read: function(config,callback){
            var me = this;

            firebase.child('messages/' + config.params.room ).once('value', function(childSnapshot, prevChildName) {
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
                    firebase.child('messages/' + config.params.room + '/' + item.id).update(item);
                    callback(null,[item.records]);
                });
            }else{
                firebase.child('messages/' + config.params.room + '/' + config.records.id).update(config.records);
                callback(null, [config.records]);
            }

        },

        update: function(config,callback){
            var me = this,
                records = config.records;

            if(records instanceof Array){
                records.forEach(function(item) {
                    firebase.child('messages/' + config.params.room + '/' + item.id).update(item);
                    callback(null,[item.records]);
                });
            }else{
                firebase.child('messages/' + config.params.room + '/' + config.records.id).update(config.records);
                callback(null,[config.records]);
            }
        },

        delete: function(config,callback){
            var me = this,
                records = config.records;

            if(records instanceof Array){
                records.forEach(function(item) {
                    firebase.child('messages/'  + config.params.room + '/' + item.id).remove();
                    callback(null,item);
                });
            }else{
                firebase.child('messages/'  + config.params.room + '/' + config.records.id).remove();
                callback(null,records);
            }
        }
    };

    return messages;

};