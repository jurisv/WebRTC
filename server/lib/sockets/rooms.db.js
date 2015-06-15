// var mongojs = require('mongojs');
// var db = mongojs('mongodb://admin:admin@ds031591.mongolab.com:31591/senchaprosvclabs', ['rooms']);

var rooms = {
    getAllRooms: function(callback) {
       // db.rooms.find(callback);
       callback(null,{
           title:'test'
       })
    },
    saveRoom: function(room, callback) {
      //  db.rooms.insert(room, callback);
    },
    updateRoom: function(room, callback) {
        /*
        db.rooms.update({
            id: room.id
        }, room, {}, callback);
        */
    },
    deleteRoom: function(id, callback) {
        /*
        db.rooms.remove({
            id: id
        }, '', callback);
        */
    }
};
 
module.exports = rooms;