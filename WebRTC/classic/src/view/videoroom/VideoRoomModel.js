Ext.define('WebRTC.view.videoroom.VideoRoomModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'WebRTC.model.Room',
        'WebRTC.model.RoomMember'
    ],
    alias: 'viewmodel.videoroom',

    data: {
        otSessionInfo: {},
        otSession: null
    },

    stores: {
        members: {
            model:'WebRTC.model.RoomMember',
            autoLoad: true
        }
    }

});
