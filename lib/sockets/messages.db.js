module.exports = function(io, nconf){

   var firebase = require('./../firebase.db.js')(nconf),
       wrap = require('./../wrapjsonresponse.js'),
       messages = {
            _messages: [],

            bindChanges: function(io, config, socket){
                var me = this,
                    room = config.params.room;

                socket.join(room);

                if(!io.messages[room]) {


                    io.messages[room] = firebase.child('messages/' + room);

                    /* io._messagesRef.on('child_added', function (childSnapshot, prevChildName) {
                     if (childSnapshot.val() && childSnapshot.val() != undefined) {
                        var data = childSnapshot.val();
                     io.of('/messages').to(room).emit('child_added', wrap(data));
                     }
                     });
                     */

                    io.messages[room].on('child_removed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/messages').to(room).emit('child_removed', wrap(data));
                        }
                    });

                    io.messages[room].on('child_changed', function (childSnapshot, prevChildName) {
                        if (childSnapshot.val() && childSnapshot.val() != undefined) {
                            var data = childSnapshot.val();
                            io.of('/messages').to(room).emit('child_changed', wrap(data));
                        }
                    });

                    io.messages[room].on('child_moved', function (childSnapshot, prevChildName) {
                     if (childSnapshot.val() && childSnapshot.val() != undefined) {
                         var data = childSnapshot.val();
                         io.of('/messages').to(room).emit('child_moved', wrap(data));
                     }
                     });
                }
            },

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