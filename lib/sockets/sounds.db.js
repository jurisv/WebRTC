module.exports = function(io, nconf){

    var firebase = require('./../firebase.db.js')(nconf),
        wrap = require('./../wrapjsonresponse.js'),
        opentok = require('./../opentok.js')(nconf),
        sounds = {
            _sounds : [],

            bindChanges: function(){
                var me = this;
                if(!io.sounds) {

                    io.sounds = firebase.child('/sounds');

                    io.sounds.on('child_added', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/sounds').emit('child_added', wrap(data));
                        }
                    });
                    io.sounds.on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/sounds').emit('child_removed',wrap(data));
                        }
                    });
                    io.sounds.on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/sounds').emit('child_changed', wrap(data));
                        }
                    });
                    io.sounds.on('child_moved', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/sounds').emit('child_moved', wrap(data));
                        }
                    });
                }
            },

            read: function(config,callback){
                firebase.child('sounds/').once('value', function(childSnapshot, prevChildName) {
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
                        opentok.getOpenTokSessionId(function(err,sessionId){
                            item.records.sessionId = sessionId;
                            item.records.apiKey = ApiKey;
                            firebase.child('sounds/' + item.id).update(item);
                            callback(null,[item.records]);
                        });
                    });
                }else{
                    opentok.getOpenTokSessionId(function(err,sessionId){
                        config.records.sessionId = sessionId;
                        config.records.apiKey = ApiKey;
                        firebase.child('sounds/' + config.records.id).update(config.records);
                        callback(null, [config.records]);
                    });
                }

            },

            update: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('sounds/' + item.id).update(item);
                        callback(null,[item.records]);
                    });
                }else{
                    firebase.child('sounds/' + config.records.id).update(config.records);
                    callback(null,[config.records]);
                }
            },

            delete: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('sounds/' + item.id).remove();
                        callback(null,item);
                    });
                }else{
                    firebase.child('sounds/' + config.records.id).remove();
                    callback(null,records);
                }
            }
        };

    return sounds
};