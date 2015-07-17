var roomsDB = require('./rooms.db.js');

module.exports = function(io) {

    //create only one so we emit only once per socket.
    if(!io.rooms){
        io.rooms = io.of('/rooms');

        function dispatchAll(socket) {
            roomsDB.getAll(function(err, data) {
                if (err) throw err;
                io.of('/rooms').emit('all', data);
            });
        }

        io.rooms.on('connection', function(socket) {

            socket.on('getAll', function() {
                dispatchAll(socket);
            });

            socket.on('save', function(room) {
                roomsDB.save(room, function(err, data) {
                    if (err) throw err;
                    dispatchAll(socket);
                });
            });

            socket.on('update', function(data) {
                roomsDB.update(data, function(err, data) {
                    if (err) throw err;
                    dispatchAll(socket);
                });
            });

            socket.on('delete', function(data) {
                roomsDB.delete(data.id, function(err, data) {
                    if (err) throw err;
                    dispatchAll(socket);
                });
            });

            // On connection send all the rooms, to save one round trip
            dispatchAll(socket);
        });





    }

    return io.rooms;

};