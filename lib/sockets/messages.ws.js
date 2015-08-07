var DB = require('./messages.db.js');


module.exports = function(io) {

    var messages,
        wrap = require('./wrapjsonresponse.js');


    messages = io.of('/messages');

        //once connected setup firebase listeners to push data
        // DB.bindFirebase(io);

        //handle incoming requests
    messages.on('connection', function(socket) {

            socket.on('read', function(config,callback) {
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