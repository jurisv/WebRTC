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

    // useTitleForBackButtonText: true,

    items: [{
            xtype : 'toolbar',
            docked: 'top',
            items:[
        {
            iconCls: 'x-fa fa-plus-square',
            xtype: 'button',
            plain: true,
            listeners: {
                tap: 'onRoomAdd'
            }
        },{
            iconCls: 'x-fa fa-pencil',
            xtype: 'button',
            plain: true,
            bind:{
             disabled: '{!isRoomSelected}'
            },
            listeners: {
                tap: 'onRoomEdit'
            }
        },{
            iconCls: 'x-fa fa-trash-o',
            xtype: 'button',
            plain: true,
            bind:{
                disabled: '{!isRoomSelected}'
            },
            listeners: {
                tap: 'onRoomRemove'
            }
        },{
            xtype: 'spacer'
        },
        {
            iconCls: 'x-fa fa-user',
            xtype: 'button',
            bind:{
             text: '{name}'
             },
            handler: 'onSettingsUserSelect'
        },
        {
            iconCls: 'x-fa fa-expand',
            xtype: 'button',
            bind:{
                hidden: '{!isDesktop}'
            },
            handler: 'onToggleFullScreen'
        },{
            iconCls: 'x-fa fa-gear',
            xtype: 'button',
            bind:{
                hidden: '{isAdmin}'
            },
            handler: 'onSettingsAdminSelect'
        },{
            style:'background-image: url(/static/images/TokBoxIcon.png) !important; background-size: 29px 29px; background-repeat: no-repeat; ',
            xtype: 'button',
            plain: true,
            listeners: {
                tap: 'onLogoClick'
            }
        }
    ]
    },
    {
        xtype: 'dataview',
        title: 'Rooms',
        fullscreen: true,
        reference: 'roomsgrid',
        itemSelector: 'div.room-wrap',
        itemTpl: [
            '<tpl for=".">',
            '<div style="font-size:16px; margin-bottom: 10px;padding:10px;border-bottom: solid 1px #909090;" class="room-wrap">',
            '<span class="x-fa fa-users fa-lg" title="{name}"> </span>{name}',
            '<br/>',
            '</div>',
            '</tpl>'
        ],
        bind:{
            store: '{rooms}'
        },
        listeners: {
           select: 'onRoomSelect'
        }
    }],

    listeners:{
        show: 'onShow',
        scope: 'controller'
    }
});
