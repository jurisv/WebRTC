module.exports = function(io, nconf){

    var firebase = require('./../firebase.db.js')(nconf),
        wrap = require('./../wrapjsonresponse.js'),
        opentok = require('./../opentok.js')(nconf),
        securityroles = {
            _securityroles : [],

            bindChanges: function(){
                var me = this;
                if(!io._securityroles) {

                    io._securityroles = firebase.child('/securityroles');

                    io._securityroles.on('child_added', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/securityroles').emit('child_added', wrap(data));
                        }
                    });
                    io._securityroles.on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/securityroles').emit('child_removed',wrap(data));
                        }
                    });
                    io._securityroles.on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/securityroles').emit('child_changed', wrap(data));
                        }
                    });
                    io._securityroles.on('child_moved', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();

                            io.of('/securityroles').emit('child_moved', wrap(data));
                        }
                    });
                }
            },

            read: function(config,callback){
                firebase.child('securityroles/').once('value', function(childSnapshot, prevChildName) {
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
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('securityroles/' + item.id).update(item);
                        callback(null,[item.records]);
                    });
                }else{
                    firebase.child('securityroles/' + config.records.id).update(config.records);
                    callback(null, [config.records]);
                }

            },

            update: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('securityroles/' + item.id).update(item);
                        callback(null,[item.records]);
                    });
                }else{
                    firebase.child('securityroles/' + config.records.id).update(config.records);
                    callback(null,[config.records]);
                }
            },

            delete: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('securityroles/' + item.id).remove();
                        callback(null,item);
                    });
                }else{
                    firebase.child('securityroles/' + config.records.id).remove();
                    callback(null,records);
                }
            }
        };

    return securityroles
};