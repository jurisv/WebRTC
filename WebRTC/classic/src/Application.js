
Ext.define('WebRTC.Application', {
    extend: 'Ext.app.Application',
    name: 'WebRTC',

    requires: ['WebRTC.*'],

    defaultToken : 'home',

    controllers:[
        'opentok.controller.OpenTok',
        'soundlibrary.controller.SoundLibrary',
        'Auth',
        'Navigation'
    ],

    stores:['WebRTC.store.chat.Rooms','Settings','SecurityRoles','Users'],

    init: function(){
        WebRTC.util.ErrorLogger.init();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
