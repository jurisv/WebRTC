module.exports = function(server, nconf) {

    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
        console.log('Socket Connection:' + socket.id);


        socket.on('disconnect', function(event) {
           console.log('Socket Disconnection:' + socket.id)
        });
    });

    io.rooms = require('./rooms.ws.js')(io, nconf);
    io.roommembers = require('./roommembers.ws.js')(io, nconf);
    io.messages = require('./messages.ws.js')(io, nconf);

    io.users = require('./users.ws.js')(io, nconf);
    io.securityroles = require('./securityroles.ws.js')(io, nconf);

    return io;
};
