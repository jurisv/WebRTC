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
                // roomselect: 'onSessionCreate',
                // chatmessage: 'onChatEmit'
            }
        }
    },
    init: function()
    {
        var me= this;

        // Yes, yes I know socket is a global; deal with it.
        socket = io();

        socket.on('rooms', function(rooms){
            me.fireEvent('roomschanged',rooms)
        });
    }
});
