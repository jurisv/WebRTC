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
        // Yes, yes I know socket is a global.
        socket = io();

        socket.on('rooms', function(msg){
            console.log('rooms changed' + msg);
        });
    }
});
