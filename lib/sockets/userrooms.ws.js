module.exports = function(io, nconf) {

    var DB = require('./userrooms.db.js')(io, nconf),
        wrap = require('./../wrapjsonresponse.js'),
        collection;

    collection = io.of('/userrooms');

    //once connected setup firebase listeners to push data
    DB.bindChanges();

    //handle incoming requests
    collection.on('connection', function(socket) {

        socket.on('read', function(config,callback) {
            DB.read(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data) );  //options, success, response
            });
        });

        socket.on('create', function(config,callback) {
            DB.create(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data) );
            });
        });

        socket.on('update', function(config,callback) {
            DB.update(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data));
            });
        });

        socket.on('destroy', function(config,callback) {
            DB.delete(config,function(err, data) {
                if (err) throw err;
                callback(null,true, wrap(data));
            });
        });

    });


    return collection;

};