var wrap = wrap = require('./../wrapjsonresponse.js');

module.exports = function(io, nconf, firebase) {

    var roomsDB = require('./rooms.db.js')(io, nconf, firebase),
        rooms;

        rooms = io.of('/rooms');

        //once connected setup firebase listeners to push data
        roomsDB.bindFirebase();

        //handle incoming requests
        rooms.on('connection', function(socket) {

            socket.on('read', function(config,callback) {
                roomsDB.read(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data) );  //options, success, response
                });
            });

            socket.on('create', function(config,callback) {
                roomsDB.create(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data) );
                });
            });

            socket.on('update', function(config,callback) {
                roomsDB.update(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data));
                });
            });

            socket.on('destroy', function(config,callback) {
                roomsDB.delete(config,function(err, data) {
                    if (err) throw err;
                    callback(null,true, wrap(data));
                });
            });

        });


    return rooms;

};