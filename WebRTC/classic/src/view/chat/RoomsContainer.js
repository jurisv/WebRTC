Ext.define('WebRTC.view.chat.RoomsContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'chatroomscontainer',
    viewModel: {
        type: 'chatroomscontainer'
    },
    controller: 'chatroomscontainer',
    tbar:[
        {
            iconCls: 'x-fa fa-plus-square',
            plain: true,
            bind:{
                disabled: '{!isUser}'
            },
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
                store: '{myrooms}'
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
                click: 'onRoomShareClick'
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
            hidden: true,
            bind:{
                text: '{name}'
            },
            handler: 'onUserClick'
        },
        {
            iconCls: 'x-fa fa-expand',
            hidden: true,
            handler: 'onToggleFullScreen'
        },{
            iconCls: 'x-fa fa-gear',
            bind:{
                hidden: '{!isAdmin}'
            },
            handler: 'onGearClick'
        },{
            //This is left here on purpose to easily remove branding piece from project
            style:'background-image: url(/static/images/TokBoxIcon.png) !important; background-size: 29px 29px; background-repeat: no-repeat; ',
            hidden: true,
            plain: true,
            listeners: {
                click: function(){
                    Ext.create('Ext.window.Window', {
                        title: 'About',
                        iconCls: 'x-fa fa-info-circle fa-lg',
                        height: 640,
                        width: 600,
                        layout: 'fit',
                        modal: true,
                        items: {
                            xtype: 'panel',
                            html: '<a href="http://www.sencha.com/services/" target="_blank" ><img src="/static/images/About.png" border=0 ></a> ',
                            border: false

                        }
                    }).show();
                }
            }
        }

    ],
    tabPosition: 'bottom',
    layout:'fit',
    tools: [
        {
            type: 'gear',
            callback: 'onUserClick'
        },{
            type: 'save',
            bind:{
                hidden: '{!isAdmin}'
            },
            handler: 'onGearClick'
        }, {
            type: 'maximize',
            callback: 'onToggleFullScreen'
        },{
            type: 'help',
            callback: function() {
                Ext.create('Ext.window.Window', {
                    title: 'About',
                    iconCls: 'x-fa fa-info-circle fa-lg',
                    height: 640,
                    width: 600,
                    layout: 'fit',
                    modal: true,
                    items: {
                        xtype: 'panel',
                        html: '<a href="http://www.sencha.com/services/" target="_blank" ><img src="/static/images/About.png" border=0 ></a> ',
                        border: false

                    }
                }).show();
            }
        }
    ],
    items: [
    {
        defaultContent: true,
        bodyStyle: 'background: rgb(236, 247, 255);',
        layout:{
            type: 'vbox',
            pack: 'middle',
            align: 'middle'
        },
        items:[{
            bodyStyle: 'background: transparent;',
            html:'<div class="defaultContent"><h1>Welcome</h1><p>Please select a room</p></div>'
        }]
    }
    ]

});
