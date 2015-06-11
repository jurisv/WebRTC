var roomsDB = require('./rooms.db');

module.exports = function(io) {
 
    var rooms = io.of('/rooms');
 
    rooms.on('connection', function(socket) {
 
        socket.on('getAllrooms', function() {
            dispatchAll(socket);
        });
 
        socket.on('saveRoom', function(todo) {
            roomsDB.saveTodo(todo, function(err, data) {
                if (err) throw err; // You can emit the error to a socket	
                dispatchAll(socket);
            });
        });
 
        socket.on('updateRoom', function(data) {
            roomsDB.updateTodo(data, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
        
        socket.on('deleteRoom', function(data) {
            roomsDB.deleteTodo(data.id, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
 
        // On connection send all the rooms, to save one round trip
        dispatchAll(socket);
    });
 
 
    function dispatchAll(socket) {
        roomsDB.getAllrooms(function(err, data) {
            if (err) throw err; // You can emit the error to a socket 
            io.of('/rooms').emit('allrooms', data);
        });
    }
 
    return rooms;
};