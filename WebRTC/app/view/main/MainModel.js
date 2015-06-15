Ext.define('WebRTC.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'WebRTC.model.Room',
        'WebRTC.model.RoomMember'
    ],
    alias: 'viewmodel.main',

    data: {
        appName: 'WebRTC',
        name: null,                     // set by prompt
        otSessionInfo: {},              // set by GET: /data/global
        otSession: null,                // created by controller
        loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    stores: {
        rooms: {
            model: 'WebRTC.model.Room',
            autoLoad: true
        },
        globalusers: {
            model: 'WebRTC.model.RoomMember',
            autoLoad: true
        }
    }
});
