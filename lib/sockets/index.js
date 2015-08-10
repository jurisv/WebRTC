module.exports = function(server, nconf) {

    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
        console.log('Socket Connection:' + socket.id);
    });

    io.rooms = require('./rooms.ws.js')(io, nconf);
    io.messages = require('./messages.ws.js')(io, nconf);

    return io;
};