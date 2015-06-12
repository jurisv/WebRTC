Ext.define('WebRTC.view.video.VideoRoomModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'WebRTC.model.Room',
        'WebRTC.model.RoomMember'
    ],
    alias: 'viewmodel.videoroom',

    data: {
        otSessionInfo: {},              // set by GET: /data/global
        otSession: null                // created by controller
    },

    stores: {
        members: {
            model:'WebRTC.model.RoomMember',
            autoLoad: true
        }
    }

});
