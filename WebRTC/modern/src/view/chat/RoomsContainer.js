Ext.define('WebRTC.view.chat.RoomsContainer', {
    extend: 'Ext.Container',
    xtype: 'chatroomscontainer',

    requires: [
        'WebRTC.view.chat.RoomsContainerController',
        'WebRTC.view.chat.RoomsContainerModel',
        'WebRTC.model.AdminSettings',
        'Ext.Toolbar',
        'Ext.MessageBox',
        'Ext.Menu'
    ],

    viewModel: {
        type: 'chatroomscontainer'
    },
    controller: 'chatroomscontainer',

    layout: 'fit',

    items: [
        {
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
                    iconCls: 'rtc-opentok-logo',
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
            reference: 'roomsgrid',
            itemSelector: 'div.room-wrap',
            itemTpl: [
                '<div class="room-wrap">',
                '<span class="x-fa fa-comments fa-lg" title="{name}"> </span>{name}',
                '<br/>',
                '</div>'
            ],
            bind:{
                store: '{rooms}'
            },
            listeners: {
               select: 'onRoomSelect'
            }
        }
    ]


});
