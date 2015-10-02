module.exports = function(io, nconf){

    var firebase = require('./../firebase.db.js')(nconf),
        wrap = require('./../wrapjsonresponse.js'),
        opentok = require('./../opentok.js')(nconf),
        rooms = {
            _rooms : [],

            bindChanges: function(){
                var me = this;
                if(!io._rooms) {

                    io._rooms = firebase.child('/rooms');

                    io._rooms.on('child_added', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/rooms').emit('child_added', wrap(data));
                        }
                    });
                    io._rooms.on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/rooms').emit('child_removed',wrap(data));
                        }
                    });
                    io._rooms.on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/rooms').emit('child_changed', wrap(data));
                        }
                    });
                    io._rooms.on('child_moved', function (childSnapshot, prevChildName) {
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
                            myarray = Object.keys(data).map(function(k) { return data[k] });
                        callback(null,myarray);
                    }else{
                        callback(null,[]);
                    }
                });

            },

            create: function(config,callback){
                var me = this,
                    ApiKey = process.env.OpenTokApi || nconf.get('adminsettings').serviceprovider.opentok.ApiKey,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        opentok.getOpenTokSessionId(function(err,sessionId){
                            item.records.sessionId = sessionId;
                            item.records.apiKey = ApiKey;
                            firebase.child('rooms/' + item.id).update(item, function(err){
                                if(err){
                                    callback(err,null);
                                }else{
                                    callback(null,[item.records]);
                                }
                            });

                        });
                    });
                }else{
                    opentok.getOpenTokSessionId(function(err,sessionId){
                        config.records.sessionId = sessionId;
                        config.records.apiKey = ApiKey;
                        firebase.child('rooms/' + config.records.id).update(config.records, function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null, [config.records]);
                            }
                        });

                    });
                }

            },

            update: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('rooms/' + item.id).update(item, function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,[item.records]);
                            }
                        });
                    });
                }else{
                    if (!!config.records.id) {
                        firebase.child('rooms/' + config.records.id).update(config.records, function (err) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, [config.records]);
                            }
                        });
                    }
                }
            },

            delete: function(config,callback){
                var me = this,
                    records = config.records;

                console.log('DELETE ROOM');
                callback(null,null);
                return;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('rooms/' + item.id).remove(function(err){
                            if(err){
                                callback(err,null);
                            }else{
                                callback(null,item);
                            }
                        });

                    });
                }else {
                   if (!!config.records.id) {
                        firebase.child('rooms/' + config.records.id).remove(function (err) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, records);
                            }
                        });
                   }
                }
            }
        };

    return rooms;
};