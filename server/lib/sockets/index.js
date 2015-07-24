//
// pattern ideas : http://thejackalofjavascript.com/re-architecting-a-firebase-app-in-node/
//

module.exports = function(server) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
    	// the primary socket at '/'
        console.log('Socket Connection:' + socket.id);
    });

    io.wrapresponse = function  (data,total){
        return {
            "success": true,
            "message": "Successful",
            "total": total,
            "timestamp": new Date(),
            "data" : data
        }
    };

    var rooms = require('./rooms.ws.js')(io);
    var messages = require('./messages.ws.js')(io);

    return io;
};