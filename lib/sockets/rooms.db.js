var OpenTok = require('opentok'), // OpenTok WebRTC service calls  http://www.tokbox.com
    wrap = require('./../wrapjsonresponse.js');

    module.exports = function(io, nconf, firebase){

    var rooms = {
            _rooms : [],

            getOpenTokSessionId: function(callback){
                var ApiKey = nconf.get('adminsettings').serviceprovider.opentok.ApiKey,
                    ApiSecret = nconf.get('adminsettings').serviceprovider.opentok.SecretKey,
                    opentok = new OpenTok(ApiKey, ApiSecret);

                opentok.createSession(function(err, session) {
                        if (err) return console.log(err);
                        callback(null,session.sessionId );
                    }
                );
            },

            getAll: function(callback) {

                var me = this;

                if(me._rooms.length == 0){

                    me._roomsRef =  firebase.child('rooms');

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
                                    io.of('/rooms').emit('all', data);
                                }
                            });
                        }
                    });

                }else{
                    callback(null,me._rooms);
                }
            },

            bindFirebase: function(){
                var me = this;
                if(!io._roomsRef) {


                    io._roomsRef = firebase.child('rooms');

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

                            io.of('/rooms').emit('child_added', wrap(data));
                        }
                    });
                    io._roomsRef.on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/rooms').emit('child_removed',wrap(data));
                        }
                    });
                    io._roomsRef.on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/rooms').emit('child_changed', wrap(data));
                        }
                    });
                    io._roomsRef.on('child_moved', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/rooms').emit('child_moved', wrap(data));
                        }
                    });
                }
            },

            read: function(config,callback){
                firebase.child('rooms/').once('value', function(childSnapshot, prevChildName) {
                    if (childSnapshot.val() && childSnapshot.val() != undefined){
                        var data = childSnapshot.val(),
                            arrayRooms = Object.keys(data).map(function(k) { return data[k] });
                        callback(null,arrayRooms);
                    }else{
                        callback(null,[]);
                    }
                });

            },

            create: function(config,callback){
                var me = this,
                    ApiKey = nconf.get('adminsettings').serviceprovider.opentok.ApiKey,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        me.getOpenTokSessionId(function(err,sessionId){
                            item.records.sessionId = sessionId;
                            item.records.apiKey = ApiKey;
                            firebase.child('rooms/' + item.id).update(item);
                            callback(null,[item.records]);
                        });
                    });
                }else{
                    me.getOpenTokSessionId(function(err,sessionId){
                        config.records.sessionId = sessionId;
                        config.records.apiKey = ApiKey;
                        firebase.child('rooms/' + config.records.id).update(config.records);
                        callback(null, [config.records]);
                    });
                }

            },

            update: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('rooms/' + item.id).update(item);
                        callback(null,[item.records]);
                    });
                }else{
                    firebase.child('rooms/' + config.records.id).update(config.records);
                    callback(null,[config.records]);
                }
            },

            delete: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('rooms/' + item.id).remove();
                        callback(null,item);
                    });
                }else{
                    firebase.child('rooms/' + config.records.id).remove();
                    callback(null,records);
                }
            }
        };

    return rooms
};