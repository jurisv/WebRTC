module.exports = function(io, nconf){

    var firebase = require('./../firebase.db.js')(nconf),
        wrap = require('./../wrapjsonresponse.js'),
        opentok = require('./../opentok.js')(nconf),
        users = {
            _users : [],

            bindChanges: function(){
                var me = this;
                if(!io._users) {

                    io._users = firebase.child('/users');

                    io._users.on('child_added', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/users').emit('child_added', wrap(data));
                        }
                    });
                    io._users.on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/users').emit('child_removed',wrap(data));
                        }
                    });
                    io._users.on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/users').emit('child_changed', wrap(data));
                        }
                    });
                    io._users.on('child_moved', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/users').emit('child_moved', wrap(data));
                        }
                    });
                }
            },

            read: function(config,callback){
                firebase.child('users/').once('value', function(childSnapshot, prevChildName) {
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
                var user;
                if(config.records){
                    user = config.records;

                    // let firebase create the id.
                    user.id = null;

                    // We need to create a user account and also save the user data.
                    firebase.createUser({
                        email    : user['email_userid'],
                        password : user['password']
                    }, function(error, userData) {
                        if (error) {
                            console.log("Error creating user:", error);
                            callback(error,null);
                        } else {
                            console.log("Successfully created user account with uid:", userData.uid);
                            user.id = userData.uid;
                            user.password = null;   //not saved in user record

                            firebase.child('users').child(userData.uid).update(user);
                            callback(null,[user]);
                        }
                    });
                }
            },

            update: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('users/' + item.id).update(item);
                        callback(null,[item.records]);
                    });
                }else{
                    firebase.child('users/' + config.records.id).update(config.records);
                    callback(null,[config.records]);
                }
            },

            delete: function(config,callback){
                var me = this,
                    records = config.records;

                if(records instanceof Array){
                    records.forEach(function(item) {
                        firebase.child('users/' + item.id).remove();
                        callback(null,item);
                    });
                }else{
                    firebase.child('users/' + config.records.id).remove();
                    callback(null,records);
                }
            }
        };

    return users
};