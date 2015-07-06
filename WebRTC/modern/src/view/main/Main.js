/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

  //      'WebRTC.view.main.MainController',
  //      'WebRTC.view.main.MainModel',
  //      'WebRTC.view.main.List',

   //     'WebRTC.view.main.UserMedia',
        'Ext.Menu'

    ],

   controller: 'main',
 //   viewModel: 'main',

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
                    iconCls: 'x-fa fa-home',
                    // ui: 'plain',
                    style: 'color: #fff',
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
