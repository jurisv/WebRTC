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
            handler: 'onUserClick'
        },
        {
            iconCls: 'x-fa fa-expand',
            handler: 'onToggleFullScreen'
        },{
            iconCls: 'x-fa fa-gear',
            bind:{
                hidden: '{isAdmin}'
            },
            handler: function(){

                var me = this;

                //Theres only one setting but the REST API needs and id.
                WebRTC.model.AdminSettings.load(0,{
                    success: function(record,operation){

                        Ext.create('Ext.window.Window', {
                            title: 'Admin Settings',
                            iconCls: 'x-fa fa-gear fa-lg',
                            height: 500,
                            width: 400,
                            layout: 'fit',
                            modal: true,
                            items: {
                                xtype: 'settingsadmin',

                                border: false

                            }
                        }).show();

                    }
                });
            }
        },{
            style:'background-image: url(/static/images/TokBoxIcon.png) !important; background-size: 29px 29px; background-repeat: no-repeat; ',
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
    flex:4,
    items: []

});
