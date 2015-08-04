var DB = require('./messages.db.js');


module.exports = function(io) {

    //create only one so we emit only once per socket.
    if(!io.messages){
        io.messages = io.of('/messages');

        //once connected setup firebase listeners to push data
        // DB.bindFirebase(io);

        //handle incoming requests
        io.messages.on('connection', function(socket) {

            socket.on('read', function(config,callback) {
                DB.read(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, global.App.wrapresponse(data) );  //options, success, response
                });
            });

            socket.on('create', function(config,callback) {
                DB.create(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, global.App.wrapresponse(data) );
                });
            });

            socket.on('update', function(config,callback) {
                DB.update(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,global.App.wrapresponse(data));
                });
            });

            socket.on('destroy', function(config,callback) {
                DB.delete(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,global.App.wrapresponse(data));
                });
            });

        });

    }

    return io.messages;

};