Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    layout: 'card',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],
    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    items: [{
        xtype:'chatroomscontainer',
        flex:1,
        reference: 'roomtabs'
    }]
});
