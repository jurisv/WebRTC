module.exports = function(io, nconf, firebase) {

    var messages,
        DB = require('./messages.db.js')(io, nconf,firebase),
        wrap = require('./../wrapjsonresponse.js');


    messages = io.of('/messages');


    messages.on('connection', function(socket) {

            socket.on('read', function(config,callback) {

                //once a read is started we can bind changes to push to it.
                DB.bindRoomChanges(io,config, socket);

                DB.read(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data) );  //options, success, response
                });
            });

            socket.on('create', function(config,callback) {
                DB.create(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data) );
                });
            });

            socket.on('update', function(config,callback) {
                DB.update(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data));
                });
            });

            socket.on('destroy', function(config,callback) {
                DB.delete(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data));
                });
            });

        });


    return messages;

};