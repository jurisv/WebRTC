Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],

    controller: 'mainviewport',

    flex: 1,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    tools:[{
        type: 'maximize',
        iconCls: 'x-fa fa-home',
        callback: 'onToggleFullScreen'
    },{
        type: 'gear',
        iconCls: 'x-fa fa-home',
        callback: 'onViewportGear'
    }],

    viewModel:{
        //initial prompt of name saved here.
        data: {
            name: null
        }
    },

    items: [{
        flex: 1,
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
                hidden: true, // todo: not implemented
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
    ],
    listeners:{
       // afterrender: ''
    }
});
