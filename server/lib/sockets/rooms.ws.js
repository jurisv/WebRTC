var roomsDB = require('./rooms.db.js');


module.exports = function(io) {

    //create only one so we emit only once per socket.
    if(!io.rooms){
        io.rooms = io.of('/rooms');

        //once connected setup firebase listeners to push data
        roomsDB.bindFirebase(io);

        //handle incoming requests
        io.rooms.on('connection', function(socket) {

            socket.on('read', function(config,callback) {
                roomsDB.read(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, io.wrapresponse(data, data.length) );  //options, success, response
                });
            });

            socket.on('create', function(config,callback) {
                roomsDB.create(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, io.wrapresponse(data, data.length) );
                });
            });

            socket.on('update', function(config,callback) {
                roomsDB.update(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,io.wrapresponse(data, data.length));
                });
            });

            socket.on('destroy', function(config,callback) {
                roomsDB.delete(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,io.wrapresponse(data, data.length));
                });
            });

        });

    }

    return io.rooms;

};