Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],

    controller: 'mainviewport',

    viewModel:{
        data: {
            name: null,                     // set by prompt
            room: null                      // ?? perhaps delete
        },
        stores: {
            rooms: {
                model: 'WebRTC.model.chat.Room',
                autoLoad: true
            },
            globalusers: {
                model: 'WebRTC.model.chat.RoomMember',
                autoLoad: true
            }
        },
        formulas: {
            isAdmin: function (get) {
                return get('name') != 'admin' ;    //shows config button if name is admin
            },
            isRoomSelected: function (get) {
                return get('room') != null ;    //edit allowed only when selected
            }
        }
    },

    flex: 1,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    tbar:[
        {
            iconCls: 'x-fa fa-plus-square',
            plain: true,
            listeners: {
                click: 'onRoomAdd'
            }
        },{
            iconCls: 'x-fa fa-pencil',
            plain: true,
            bind:{
                disabled: '{!isRoomSelected}'
            },
            listeners: {
                click: 'onRoomEdit'
            }
        },{
            xtype: 'combobox',
            reference: 'roomscombo',
            bind:{
                store: '{rooms}'
            },
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select: 'onRoomSelect'
            }
        }
        ,'->',
        {
            iconCls: 'x-fa fa-user',
            bind:{
                text: '{name}'
            },
            handler: 'onSettingsUserSelect'
        },
        {
            iconCls: 'x-fa fa-expand',
            handler: 'onToggleFullScreen'
        },{
            iconCls: 'x-fa fa-gear',
            bind:{
                hidden: '{isAdmin}'
            },
            handler: 'onSettingsAdminSelect'
        }
    ],


    items: [
        {
        flex: 1,
        hidden: true, // todo: not implemented
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items:[
            {
                xtype: 'tabpanel',
                flex:3,
                deferredRender: false,
                items:[
                {
                    title: 'Rooms',
                    xtype: 'chatrooms',
                    iconCls: 'x-fa fa-home',
                    flex: 1,
                    reference: 'homerooms'
                },{
                    title: 'Users',
                    xtype: 'chatmembers',
                    reference: 'homeusers',
                    hidden: true,
                    iconCls: 'x-fa fa-home',
                    flex: 1
                }]
            },
            {
                xtype: 'tabpanel',
                flex:1,
                items:[{
                    title: '1:1 Chat',
                    xtype: 'chatmembers',
                    reference: 'privateusers',
                    iconCls: 'x-fa fa-shield',
                    flex: 1
                }]
            }
        ]
    },
        {
            xtype: 'tabpanel',
            reference: 'roomtabs',
            flex:4,
            items:[]
        }
    ]
});
