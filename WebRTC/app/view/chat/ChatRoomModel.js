Ext.define('WebRTC.view.chat.ChatRoomModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'WebRTC.model.Room',
        'WebRTC.model.RoomMessage',
        'WebRTC.model.RoomMember'
    ],
    alias: 'viewmodel.chatroom',

    data: {
       otSessionInfo: {}
       // otSession: null     // created by controller
    },

    stores: {
        roommessages: {
            model:'WebRTC.model.RoomMessage',
            autoLoad: true
        },
        members: {
            model:'WebRTC.model.RoomMember',
            autoLoad: true
        }
    }

});
