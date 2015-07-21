var roomsDB = require('./rooms.db.js');

module.exports = function(io) {

    //create only one so we emit only once per socket.
    if(!io.rooms){
        io.rooms = io.of('/rooms');

        io.rooms.on('connection', function(socket) {

            socket.on('read', function(config,callback) {
                roomsDB.read(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,data);  //options, success, response
                });
            });

            socket.on('create', function(config,callback) {
                roomsDB.create(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,data);
                });
            });

            socket.on('update', function(config,callback) {
                roomsDB.create(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,data);
                });
            });

            socket.on('delete', function(config,callback) {
                roomsDB.create(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true,data);
                });
            });

        });

    }

    return io.rooms;

};