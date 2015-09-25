Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    layout: 'border',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],
    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    items: [{
        // title: 'Online',
        // collapsable: true,
        // iconCls: 'x-fa fa-group fa-lg',
        title: 'People',
        xtype: 'chatpresense',
        region:'west',
        collapsable: true,
        collasped: true,
        bind: {
            hidden: '{!isAuthenticated}'
        },
        split:true,
        minWidth: 200,
        flex: 1
    },{
        xtype:'chatroomscontainer',
        region:'center',
        title: 'Sencha Communicator',
        flex:5,

        /*tools: [
        {
            type: 'plus',
            callback: function() {
                // show help here
            }
        }, {
            type: 'gear',
            callback: function() {
                // do refresh
            }
        }, {
            type: 'maximize',
            callback: function() {
                // do refresh
            }
        },{
            type: 'help',
            callback: function() {
                // show help here
            }
        }
        ],*/

        reference: 'roomtabs'
    }]
});
