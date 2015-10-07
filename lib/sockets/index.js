module.exports = function(server, nconf) {

    var io = require('socket.io')(server);
    var onlineUsers = 0;

    io.on('connection', function(socket) {
        onlineUsers++;
        io.emit('onlineUsers', { onlineUsers: onlineUsers });
        console.log('Socket Connection:' + socket.id + ' onlineUsers:' + onlineUsers);

        socket.on('disconnect', function(event) {
            onlineUsers--;
            io.emit('onlineUsers', { onlineUsers: onlineUsers });
           console.log('Socket Disconnection:' + socket.id + ' onlineUsers:' + onlineUsers);
        });
    });

    io.rooms = require('./rooms.ws.js')(io, nconf);
    io.roommembers = require('./roommembers.ws.js')(io, nconf);
    io.messages = require('./messages.ws.js')(io, nconf);

    io.users = require('./users.ws.js')(io, nconf);
    io.securityroles = require('./securityroles.ws.js')(io, nconf);

    return io;
};
