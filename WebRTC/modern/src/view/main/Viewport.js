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

    viewModel: {
        type: 'mainviewport'
    },
    controller: 'viewport',

    requires: [
        'Ext.Toolbar',
        'Ext.MessageBox',
        'Ext.Menu'
    ],

    useTitleForBackButtonText: true,

    items: [
        {
            xtype: 'list',
            title: 'Rooms',
            fullscreen: true,
            reference: 'roomsgrid',
            itemTpl: '{name}',
            // grouped: true,
            bind:{
                store: '{rooms}'
            },
            /*columns: [
                { text: 'Name',  dataIndex: 'name', flex: 1}
            ],*/
            listeners: {
               select: 'onRoomSelect'
            }
        },{
            xtype: 'toolbar',
            docked: 'bottom',
            hidden: true,
            items: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-navicon',
                    ui: 'plain',
                    handler: 'onHamburgerClick'
                }
            ]
        }
    ],

    listeners:{
        show: 'onShow',
        scope: 'controller'
    }
});
