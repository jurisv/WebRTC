/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

        'WebRTC.view.main.MainController',
        'WebRTC.view.main.MainModel',
        'WebRTC.view.main.List',

        'WebRTC.view.main.UserMedia'


    ],

    controller: 'main',
    viewModel: 'main',

    defaults: {
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

    items: [
        {
            title: 'Home',
            iconCls: 'fa-home',
            layout: 'fit',
            // The following grid shares a store with the classic version's grid as well!
            items: [{
                xtype: 'mainlist'
            }]
        },{
            title: 'UserMedia',
            iconCls: 'fa-user',
            items: [{
                xtype: 'UserMedia'
            }]
        },{
            title: 'PeerConnection',
            iconCls: 'fa-users',
            bind: {
                html: '{loremIpsum}'
            }
        },{
            title: 'DataChannel',
            iconCls: 'fa-database',
            bind: {
                html: '{loremIpsum}'
            }
        }
    ]
});
