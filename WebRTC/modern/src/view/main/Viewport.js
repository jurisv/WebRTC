/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',

    requires: [
        'WebRTC.view.chat.RoomsContainer'
    ],

    viewModel: {
        type: 'mainviewport'
    },
    controller: 'mainviewport',

    useTitleForBackButtonText: true,

    items: [
        {
            xtype:'chatroomscontainer',
            reference: 'roomtabs'            
        }
    ]    
});
