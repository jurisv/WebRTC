Ext.define('WebRTC.view.chat.RoomsContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'chatroomscontainer',
    viewModel: {
        type: 'chatroomscontainer'
    },
    controller: 'chatroomscontainer',
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
            valueNotFoundText: '',
            emptyText: 'select a room...',
            valueField: 'id',
            listeners: {
                select: 'onRoomSelect'
            }
        },{
            iconCls: 'x-fa fa-share',
            plain: true,
            bind:{
                hidden: '{!isRoomSharingEnabled}',
                disabled: '{!isRoomSelected}'
            },
            listeners: {
                click: 'onRoomShare'
            }
        },{
            iconCls: 'x-fa fa-trash-o',
            plain: true,
            bind:{
                disabled: '{!isRoomSelected}'
            },
            listeners: {
                click: 'onRoomRemove'
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
        },{
            style:'background-image: url(/static/images/TokBoxIcon.png) !important; background-size: 29px 29px; background-repeat: no-repeat; ',
            plain: true,
            listeners: {
                click: 'onLogoClick'
            }
        }

    ],
    tabPosition: 'bottom',
    flex:4,
    items: []

});
