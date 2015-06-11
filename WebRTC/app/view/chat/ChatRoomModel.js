Ext.define('WebRTC.view.chat.ChatRoomModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'WebRTC.model.Room',
        'WebRTC.model.RoomMessage',
        'WebRTC.model.RoomMember'
    ],
    alias: 'viewmodel.chatroom',

    data: {
        otSessionInfo: {},              // set by GET: /data/global
        otSession: null                // created by controller
    },

    stores: {
        roommessages: {
            fields: [  'message', 'time', 'from'],
            data: { items: [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'items'
                }
            },
            autoLoad: true
        },
        members: {
            model:'WebRTC.model.RoomMember',
            autoLoad: true
        }
    }

});
