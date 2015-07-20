/**
 * @class WebRTC.controller.SocketIO
 * @extend Ext.app.Controller
 */
Ext.define('WebRTC.controller.SocketIO', {
    extend: 'Ext.app.Controller',
    alias: 'controller.socketio',
    id: 'socketio',
    listen: {
        controller: {
            '*': {
                startsockets: 'onStartSockets'
                // addRoom: 'onAddRoom'
            }
        }
    },

    onStartSockets: function() {

        console.log('sockets started');


        //global socket events
        this.socket = io();

        /*
        *   Namespaced events:
        *   By default when we connect to a namespace it will emit
        */
        // this.rooms = io.connect('/rooms');
        // this.bindRooms();


    },

    bindRooms: function() {
        var me= this;
        this.rooms.on('all', function(rooms){
            console.log('all rooms');
            me.fireEvent('roomschanged',rooms);
        });

        console.log('rooms bound');

    }

});
