module.exports = function(server, nconf, firebase) {

    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
    	// the root server 1st socket at '/'
        console.log('Socket Connection:' + socket.id);
    });

    io.rooms = require('./rooms.ws.js')(io, nconf, firebase);
    io.messages = require('./messages.ws.js')(io, nconf, firebase);

    return io;
};
