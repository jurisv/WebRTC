/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.Container',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',
        'Ext.Menu'

    ],

    viewModel:{
        data: {
            name: null
        }
    },
    controller: 'main',

    layout: {
        type: 'card'
    },

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            title: 'Main Menu',
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
